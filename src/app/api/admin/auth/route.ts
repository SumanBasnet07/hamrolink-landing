import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieOptions,
  createAdminSessionToken,
  getAdminConfig,
  isValidAdminCredential,
  verifyAdminSessionToken,
} from "@/lib/adminAuth";

export const runtime = "nodejs";
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS_PER_WINDOW = 20;
const loginAttempts = new Map<string, { count: number; windowStart: number }>();

function getRequestIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown-ip";
}

function isTemporarilyBlocked(ip: string) {
  const now = Date.now();
  const current = loginAttempts.get(ip);
  if (!current) return false;

  if (now - current.windowStart > LOGIN_WINDOW_MS) {
    loginAttempts.delete(ip);
    return false;
  }

  return current.count >= MAX_ATTEMPTS_PER_WINDOW;
}

function recordLoginFailure(ip: string) {
  const now = Date.now();
  const current = loginAttempts.get(ip);

  if (!current || now - current.windowStart > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, windowStart: now });
    return;
  }

  loginAttempts.set(ip, { count: current.count + 1, windowStart: current.windowStart });
}

function clearLoginFailures(ip: string) {
  loginAttempts.delete(ip);
}

export async function GET(req: NextRequest) {
  const config = getAdminConfig();

  if (!config) {
    return NextResponse.json({ error: "Admin auth env is not configured" }, { status: 500 });
  }

  const cookieValue = req.cookies.get(adminCookieOptions.name)?.value;
  return NextResponse.json({ authenticated: !!cookieValue && verifyAdminSessionToken(cookieValue, config) });
}

export async function POST(req: NextRequest) {
  const config = getAdminConfig();

  if (!config) {
    return NextResponse.json({ error: "Admin auth env is not configured" }, { status: 500 });
  }

  const ip = getRequestIp(req);
  if (isTemporarilyBlocked(ip)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const id = (body?.id || "").toString();
  const password = (body?.password || "").toString();

  if (!isValidAdminCredential(id, password, config)) {
    recordLoginFailure(ip);
    return NextResponse.json({ error: "Invalid ID or Password" }, { status: 401 });
  }

  clearLoginFailures(ip);
  const token = createAdminSessionToken(config.adminId, config.sessionSecret);

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    ...adminCookieOptions,
    value: token,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: adminCookieOptions.name,
    value: "",
    httpOnly: adminCookieOptions.httpOnly,
    sameSite: adminCookieOptions.sameSite,
    secure: adminCookieOptions.secure,
    path: adminCookieOptions.path,
    maxAge: 0,
  });
  return response;
}
