import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "hl_admin_auth";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminConfig = {
  adminId: string;
  adminPassword: string;
  sessionSecret: string;
};

export function getAdminConfig(): AdminConfig | null {
  const adminId = process.env.ADMIN_LOGIN_ID;
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminId || !adminPassword || !sessionSecret) {
    return null;
  }

  return { adminId, adminPassword, sessionSecret };
}

function safeEqualString(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function signPayload(payloadB64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function createAdminSessionToken(adminId: string, sessionSecret: string) {
  const exp = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({ sub: adminId, exp })).toString("base64url");
  const sig = signPayload(payload, sessionSecret);
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string, config: AdminConfig) {
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;

  const expectedSig = signPayload(payloadB64, config.sessionSecret);
  if (!safeEqualString(sig, expectedSig)) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as {
      sub?: string;
      exp?: number;
    };

    if (payload.sub !== config.adminId) return false;
    if (!payload.exp || Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export function isValidAdminCredential(
  id: string,
  password: string,
  config: AdminConfig
) {
  return safeEqualString(id, config.adminId) && safeEqualString(password, config.adminPassword);
}

export function requireAdminSession(req: NextRequest): NextResponse | null {
  const config = getAdminConfig();
  if (!config) {
    return NextResponse.json({ error: "Admin auth env is not configured" }, { status: 500 });
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminSessionToken(token, config)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export function requireAdminSessionOrHeaderSecret(req: NextRequest): NextResponse | null {
  const sessionError = requireAdminSession(req);
  if (!sessionError) return null;

  const secretHeader = req.headers.get("x-admin-secret") || req.headers.get("x-insights-secret");
  const expectedSecret = process.env.CHAT_INSIGHTS_SECRET || process.env.ADMIN_SECRET;

  if (expectedSecret && secretHeader && safeEqualString(secretHeader, expectedSecret)) {
    return null;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export const adminCookieOptions = {
  name: ADMIN_COOKIE_NAME,
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: ADMIN_SESSION_TTL_SECONDS,
};
