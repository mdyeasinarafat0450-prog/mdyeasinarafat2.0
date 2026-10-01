import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { pillars, ...aboutData } = data;

    const about = await prisma.about.upsert({
      where: { id: "default" },
      update: aboutData,
      create: { id: "default", ...aboutData },
    });

    // Update pillars if provided
    if (pillars && Array.isArray(pillars)) {
      // Delete existing pillars
      await prisma.aboutPillar.deleteMany({ where: { aboutId: about.id } });
      // Create new pillars
      for (let i = 0; i < pillars.length; i++) {
        await prisma.aboutPillar.create({
          data: {
            aboutId: about.id,
            icon: pillars[i].icon || "Lightbulb",
            title: pillars[i].title || "",
            subtitle: pillars[i].subtitle || "",
            description: pillars[i].description || "",
            order: i,
          },
        });
      }
    }

    return NextResponse.json(about);
  } catch {
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 }
    );
  }
}
