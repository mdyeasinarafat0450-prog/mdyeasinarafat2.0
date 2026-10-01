import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET all nav items
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const navItems = await prisma.navItem.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(navItems);
}

// POST create nav item
export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const maxOrder = await prisma.navItem.aggregate({
      _max: { order: true },
    });
    const navItem = await prisma.navItem.create({
      data: {
        name: data.name || "New Link",
        url: data.url || "#",
        visible: data.visible !== false,
        isCta: data.isCta || false,
        ctaText: data.ctaText || null,
        ctaUrl: data.ctaUrl || null,
        order: (maxOrder._max.order || 0) + 1,
      },
    });
    return NextResponse.json(navItem, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create nav item" },
      { status: 500 }
    );
  }
}

// PUT update nav item
export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, ...navData } = data;
    const navItem = await prisma.navItem.update({
      where: { id },
      data: navData,
    });
    return NextResponse.json(navItem);
  } catch {
    return NextResponse.json(
      { error: "Failed to update nav item" },
      { status: 500 }
    );
  }
}

// DELETE nav item
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

    await prisma.navItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete nav item" },
      { status: 500 }
    );
  }
}
