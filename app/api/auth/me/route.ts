import { NextResponse } from "next/server";
import { getCurrentUser, authError } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return authError("Not authenticated");
  return NextResponse.json({ user });
}
