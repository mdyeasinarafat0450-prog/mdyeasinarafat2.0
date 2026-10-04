import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET all content for admin panel
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Batch 1
    const [settings, navItems, hero, about] = await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.navItem.findMany({ orderBy: { order: "asc" } }),
      prisma.hero.findFirst(),
      prisma.about.findFirst({
        include: { pillars: { orderBy: { order: "asc" } } },
      }),
    ]);

    // Batch 2
    const [services, skills, projects, testimonials] = await Promise.all([
      prisma.service.findMany({
        include: { deliverables: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      }),
      prisma.skill.findMany({
        include: { highlights: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      }),
      prisma.project.findMany({
        include: {
          tools: { orderBy: { order: "asc" } },
          images: { orderBy: { order: "asc" } },
          tags: true,
        },
        orderBy: { order: "asc" },
      }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    ]);

    // Batch 3
    const [socials, contact, footer, seo] = await Promise.all([
      prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
      prisma.contact.findFirst(),
      prisma.footer.findFirst({
        include: { links: { orderBy: { order: "asc" } } },
      }),
      prisma.sEO.findFirst(),
    ]);

    // Batch 4
    const [whyItems, marqueeItems, cta, media] = await Promise.all([
      prisma.whyWorkItem.findMany({ orderBy: { order: "asc" } }),
      prisma.marqueeItem.findMany({ orderBy: { order: "asc" } }),
      prisma.cTA.findFirst(),
      prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return NextResponse.json({
      settings,
      navItems,
      hero,
      about,
      services,
      skills,
      projects,
      testimonials,
      socials,
      contact,
      footer,
      seo,
      whyItems,
      marqueeItems,
      cta,
      media,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
