import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "JWT_SECRET is not set. Refusing to sign sessions with a fallback key."
      );
    }
    return new TextEncoder().encode("fallback-secret-key");
  }
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Decide whether the session cookie should carry the `Secure` flag.
 * It must only be set when the request is actually served over HTTPS,
 * otherwise browsers refuse to store or send it (e.g. plain-HTTP localhost).
 */
export function isSecureRequest(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto
    ? forwardedProto.split(",")[0].trim()
    : request.nextUrl.protocol.replace(/:$/, "");
  return protocol === "https";
}

export async function createSession(
  userId: string,
  secure: boolean = process.env.NODE_ENV === "production"
) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getJwtSecret());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });

  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as { userId: string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export function authResponse(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status });
}

export function authError(message: string, status = 401) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAuth(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
}
