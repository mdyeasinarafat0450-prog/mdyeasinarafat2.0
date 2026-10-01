import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET all services
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = await prisma.service.findMany({
    include: { deliverables: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

// POST create service
export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const maxOrder = await prisma.service.aggregate({
      _max: { order: true },
    });
    const service = await prisma.service.create({
      data: {
        title: data.title || "New Service",
        iconName: data.iconName || "Video",
        tagline: data.tagline || "",
        description: data.description || "",
        image: data.image || null,
        buttonText: data.buttonText || null,
        buttonUrl: data.buttonUrl || null,
        featured: data.featured || false,
        visible: data.visible !== false,
        order: (maxOrder._max.order || 0) + 1,
        aspectRatio: data.aspectRatio || "",
        deliverables: data.deliverables
          ? {
              create: data.deliverables.map((text: string, i: number) => ({
                text,
                order: i,
              })),
            }
          : undefined,
      },
      include: { deliverables: true },
    });
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

// PUT update service
export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, deliverables, ...serviceData } = data;

    const service = await prisma.service.update({
      where: { id },
      data: serviceData,
    });

    // Update deliverables if provided
    if (deliverables && Array.isArray(deliverables)) {
      await prisma.serviceDeliverable.deleteMany({
        where: { serviceId: id },
      });
      for (let i = 0; i < deliverables.length; i++) {
        await prisma.serviceDeliverable.create({
          data: {
            serviceId: id,
            text: deliverables[i].text || deliverables[i],
            order: i,
          },
        });
      }
    }

    return NextResponse.json(service);
  } catch {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE service
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

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
