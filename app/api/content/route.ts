import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Must stay dynamic. If this route were statically prerendered, the JSON would
// be frozen at build time and CMS edits made in the admin panel would not appear
// on the front-end until the next deploy. It also lets the build run without a
// live database connection.
export const dynamic = "force-dynamic";

// GET all public content for the frontend
export async function GET() {
  try {
    const [
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
    ] = await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.navItem.findMany({ orderBy: { order: "asc" } }),
      prisma.hero.findFirst(),
      prisma.about.findFirst({
        include: { pillars: { orderBy: { order: "asc" } } },
      }),
      prisma.service.findMany({
        where: { visible: true },
        include: { deliverables: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      }),
      prisma.skill.findMany({
        where: { visible: true },
        include: { highlights: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      }),
      prisma.project.findMany({
        where: { visible: true },
        include: {
          tools: { orderBy: { order: "asc" } },
          images: { orderBy: { order: "asc" } },
          tags: true,
        },
        orderBy: { order: "asc" },
      }),
      prisma.testimonial.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
      }),
      prisma.socialLink.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
      }),
      prisma.contact.findFirst(),
      prisma.footer.findFirst({
        include: { links: { orderBy: { order: "asc" } } },
      }),
      prisma.sEO.findFirst(),
      prisma.whyWorkItem.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
      }),
      prisma.marqueeItem.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
      }),
      prisma.cTA.findFirst(),
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
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
