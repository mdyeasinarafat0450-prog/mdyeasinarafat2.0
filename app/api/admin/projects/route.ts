import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET all projects
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    include: {
      tools: { orderBy: { order: "asc" } },
      images: { orderBy: { order: "asc" } },
      tags: true,
    },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

// POST create project
export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const maxOrder = await prisma.project.aggregate({
      _max: { order: true },
    });
    const project = await prisma.project.create({
      data: {
        title: data.title || "New Project",
        category: data.category || "Video Editing",
        shortDescription: data.shortDescription || "",
        thumbnail: data.thumbnail || null,
        videoUrl: data.videoUrl || null,
        embedUrl: data.embedUrl || null,
        videoType: data.videoType || "youtube",
        duration: data.duration || null,
        aspectRatio: data.aspectRatio || "16:9",
        year: data.year || null,
        featured: data.featured || false,
        visible: data.visible !== false,
        clientName: data.clientName || null,
        projectDate: data.projectDate || null,
        projectUrl: data.projectUrl || null,
        clientBrief: data.clientBrief || null,
        myRole: data.myRole || null,
        creativeApproach: data.creativeApproach || null,
        finalResult: data.finalResult || null,
        isPlaceholder: data.isPlaceholder || false,
        order: (maxOrder._max.order || 0) + 1,
        tools: data.tools
          ? {
              create: data.tools.map((name: string, i: number) => ({
                name,
                order: i,
              })),
            }
          : undefined,
        images: data.images
          ? {
              create: data.images.map((url: string, i: number) => ({
                url,
                order: i,
              })),
            }
          : undefined,
        tags: data.tags
          ? {
              create: data.tags.map((name: string) => ({ name })),
            }
          : undefined,
      },
      include: { tools: true, images: true, tags: true },
    });
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, tools, images, tags, ...projectData } = data;

    const project = await prisma.project.update({
      where: { id },
      data: projectData,
    });

    if (tools && Array.isArray(tools)) {
      await prisma.projectTool.deleteMany({ where: { projectId: id } });
      for (let i = 0; i < tools.length; i++) {
        await prisma.projectTool.create({
          data: {
            projectId: id,
            name: tools[i].name || tools[i],
            order: i,
          },
        });
      }
    }

    if (images && Array.isArray(images)) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
      for (let i = 0; i < images.length; i++) {
        await prisma.projectImage.create({
          data: {
            projectId: id,
            url: images[i].url || images[i],
            order: i,
          },
        });
      }
    }

    if (tags && Array.isArray(tags)) {
      await prisma.projectTag.deleteMany({ where: { projectId: id } });
      for (const tag of tags) {
        await prisma.projectTag.create({
          data: {
            projectId: id,
            name: tag.name || tag,
          },
        });
      }
    }

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
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

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
