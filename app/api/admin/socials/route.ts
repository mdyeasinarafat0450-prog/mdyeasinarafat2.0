import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET all social links
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const socials = await prisma.socialLink.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(socials);
}

// POST create social link
export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const maxOrder = await prisma.socialLink.aggregate({
      _max: { order: true },
    });
    const social = await prisma.socialLink.create({
      data: {
        name: data.name || "New Social",
        url: data.url || "",
        handle: data.handle || "",
        iconName: data.iconName || "Globe",
        visible: data.visible !== false,
        order: (maxOrder._max.order || 0) + 1,
      },
    });
    return NextResponse.json(social, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create social link" },
      { status: 500 }
    );
  }
}

// PUT update social link
export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, ...socialData } = data;
    const social = await prisma.socialLink.update({
      where: { id },
      data: socialData,
    });
    return NextResponse.json(social);
  } catch {
    return NextResponse.json(
      { error: "Failed to update social link" },
      { status: 500 }
    );
  }
}

// DELETE social link
export async function DELETE(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.socialLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete social link" },
      { status: 500 }
    );
  }
}
