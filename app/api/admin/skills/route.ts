import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET all skills
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const skills = await prisma.skill.findMany({
    include: { highlights: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(skills);
}

// POST create skill
export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const maxOrder = await prisma.skill.aggregate({
      _max: { order: true },
    });
    const skill = await prisma.skill.create({
      data: {
        name: data.name || "New Skill",
        category: data.category || "Core Editing",
        shortDescription: data.shortDescription || "",
        badge: data.badge || "",
        icon: data.icon || null,
        level: data.level || 80,
        visible: data.visible !== false,
        order: (maxOrder._max.order || 0) + 1,
        highlights: data.highlights
          ? {
              create: data.highlights.map((text: string, i: number) => ({
                text,
                order: i,
              })),
            }
          : undefined,
      },
      include: { highlights: true },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

// PUT update skill
export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, highlights, ...skillData } = data;

    const skill = await prisma.skill.update({
      where: { id },
      data: skillData,
    });

    if (highlights && Array.isArray(highlights)) {
      await prisma.skillHighlight.deleteMany({ where: { skillId: id } });
      for (let i = 0; i < highlights.length; i++) {
        await prisma.skillHighlight.create({
          data: {
            skillId: id,
            text: highlights[i].text || highlights[i],
            order: i,
          },
        });
      }
    }

    return NextResponse.json(skill);
  } catch {
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

// DELETE skill
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

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
