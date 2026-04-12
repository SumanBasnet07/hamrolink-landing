import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "hl_admin_auth";

function getAuthConfig() {
  const adminId = process.env.ADMIN_LOGIN_ID;
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminId || !adminPassword || !sessionSecret) {
    return null;
  }

  return { adminId, adminPassword, sessionSecret };
}

export async function GET(req: NextRequest) {
  const config = getAuthConfig();

  if (!config) {
    return NextResponse.json({ error: "Admin auth env is not configured" }, { status: 500 });
  }

  const cookieValue = req.cookies.get(COOKIE_NAME)?.value;
  return NextResponse.json({ authenticated: cookieValue === config.sessionSecret });
}

export async function POST(req: NextRequest) {
  const config = getAuthConfig();

  if (!config) {
    return NextResponse.json({ error: "Admin auth env is not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const id = (body?.id || "").toString();
  const password = (body?.password || "").toString();

  if (id !== config.adminId || password !== config.adminPassword) {
    return NextResponse.json({ error: "Invalid ID or Password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: config.sessionSecret,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
