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
    const { links, ...footerData } = data;

    const footer = await prisma.footer.upsert({
      where: { id: "default" },
      update: footerData,
      create: { id: "default", ...footerData },
    });

    // Update links if provided
    if (links && Array.isArray(links)) {
      await prisma.footerLink.deleteMany({ where: { footerId: footer.id } });
      for (let i = 0; i < links.length; i++) {
        await prisma.footerLink.create({
          data: {
            footerId: footer.id,
            name: links[i].name || "",
            url: links[i].url || "",
            order: i,
          },
        });
      }
    }

    return NextResponse.json(footer);
  } catch {
    return NextResponse.json(
      { error: "Failed to update footer" },
      { status: 500 }
    );
  }
}
