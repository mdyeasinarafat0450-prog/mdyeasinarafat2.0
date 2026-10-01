import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, authError, isSecureRequest } from "@/lib/auth";

// A real bcrypt hash of a throwaway value, used to keep the response time of
// "unknown email" and "wrong password" indistinguishable.
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEe.7Ct2Jm5vZqGLzBnPHrYyG4vHh0uNQq";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return authError("Email and password are required", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // Always run a bcrypt comparison so an unknown email is not detectable
    // from the response timing.
    const isValid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);

    if (!user || !isValid) {
      return authError("Invalid email or password");
    }

    await createSession(user.id, isSecureRequest(request));

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    return authError("Login failed", 500);
  }
}
