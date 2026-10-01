import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * Minimal .env loader.
 *
 * The seed script runs through `tsx` (see the "db:seed" script), and unlike
 * `next build` / `next dev`, tsx does not populate process.env from `.env`.
 * Without this the required variables below would always look missing.
 *
 * Real environment variables (CI, Vercel, your shell) always win.
 */
function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  for (const rawLine of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separator = line.indexOf("=");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 12;

/**
 * Reads a required variable or aborts with an actionable message.
 * Never logs the value of a secret.
 */
function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}.\n` +
        `Add it to your .env file (copy .env.example) or set it in your host's dashboard.`
    );
  }

  return value;
}

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Credentials come from the environment - nothing secret lives in this repo.
  const adminEmail = requireEnv("ADMIN_EMAIL").toLowerCase();
  const adminPassword = requireEnv("ADMIN_PASSWORD");

  if (adminPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    );
  }

  // Never stored in plaintext - only the bcrypt hash is written.
  const hashedPassword = await bcrypt.hash(adminPassword, BCRYPT_ROUNDS);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    // Left untouched on purpose: re-seeding must not silently reset the
    // password of an existing admin account.
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Admin user ready:", admin.email);

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteTitle: "Md Yeasin Arafat — Video Editor & Motion Graphics Designer",
      siteDescription:
        "Portfolio of Md Yeasin Arafat, a video editor and motion graphics enthusiast creating engaging, modern and visually compelling content.",
      logoText: "MYA",
      primaryColor: "#FF334B",
      secondaryColor: "#FF9F1C",
      accentColor: "#00F0FF",
      copyright: "© 2026 Md Yeasin Arafat. All rights reserved.",
    },
  });

  // Navigation
  const navItems = [
    { name: "Home", url: "#hero", order: 0 },
    { name: "About", url: "#about", order: 1 },
    { name: "Services", url: "#services", order: 2 },
    { name: "Work", url: "#work", order: 3 },
    { name: "Why Me", url: "#why-me", order: 4 },
    { name: "Testimonials", url: "#testimonials", order: 5 },
    { name: "Contact", url: "#contact", order: 6 },
  ];

  for (const item of navItems) {
    await prisma.navItem.upsert({
      where: { id: `nav-${item.name.toLowerCase()}` },
      update: {},
      create: { id: `nav-${item.name.toLowerCase()}`, ...item },
    });
  }

  // CTA Nav Item
  await prisma.navItem.upsert({
    where: { id: "nav-cta" },
    update: {},
    create: {
      id: "nav-cta",
      name: "Let's Work Together",
      url: "#contact",
      order: 7,
      isCta: true,
      ctaText: "Let's Work Together",
      ctaUrl: "#contact",
    },
  });

  // Hero
  await prisma.hero.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      badgeText: "Available for Freelance Projects",
      title: "Turning Ideas Into Visual Stories",
      description:
        "I'm Md Yeasin Arafat — a video editor and motion graphics enthusiast focused on creating engaging, modern and visually compelling content.",
      ctaText: "View My Work",
      ctaUrl: "#work",
      secondaryCtaText: "Let's Work Together",
      secondaryCtaUrl: "#contact",
      heroImage:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
      stat1Label: "Focus",
      stat1Value: "Story & Pacing",
      stat2Label: "Formats",
      stat2Value: "16:9 & 9:16",
      stat3Label: "Aesthetic",
      stat3Value: "Cinematic Dark",
    },
  });

  // About
  const about = await prisma.about.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "Behind The Edit",
      description:
        "Editing isn't just cutting clips together — it's conducting the rhythm of how an audience feels.",
      shortBio:
        "I am a student studying Arts with a strong passion for visual creativity.",
      longBio:
        "I work with video editing, motion graphics, and graphic design. Rather than resting on what I already know, I am continuously improving both my technical execution and creative storytelling instinct every single day.",
      experience: "3+ Years",
      education: "Arts Student",
      ctaText: "Get in touch",
      ctaUrl: "#contact",
      statusText: "Open to Serious Collaborations",
    },
  });

  // About Pillars
  const pillars = [
    {
      icon: "Lightbulb",
      title: "Creative Mindset",
      subtitle: "Storytelling & Rhythm",
      description:
        "Approaching every cut with an eye for visual pacing, narrative tension, and emotional connection rather than mechanical assembly.",
    },
    {
      icon: "Sparkles",
      title: "Client Experience",
      subtitle: "Practical Delivery",
      description:
        "Hands-on experience translating client briefs into polished, retention-focused video edits and high-impact visual assets.",
    },
    {
      icon: "TrendingUp",
      title: "Continuous Learning",
      subtitle: "Daily Skill Expansion",
      description:
        "Constantly studying advanced editing workflows, color theory, motion design principles, and modern viewer psychology.",
    },
    {
      icon: "Compass",
      title: "Future Focused",
      subtitle: "Long-Term Vision",
      description:
        "Committed to building a long-term career in the creative industry and eventually establishing a visionary creative studio of my own.",
    },
  ];

  for (let i = 0; i < pillars.length; i++) {
    await prisma.aboutPillar.upsert({
      where: { id: `pillar-${i}` },
      update: {},
      create: { id: `pillar-${i}`, aboutId: about.id, ...pillars[i], order: i },
    });
  }

  // Services
  const services = [
    {
      title: "Video Editing",
      iconName: "Video",
      tagline: "Rhythm, pacing, and emotional resonance",
      description:
        "Engaging and polished edits designed around storytelling, pacing, rhythm and audience retention.",
      deliverables: [
        "Narrative & story arc structuring",
        "Seamless audio syncing & sound design",
        "Color grading & mood enhancement",
        "Dynamic b-roll integration",
      ],
      aspectRatio: "16:9 / Multi-format",
    },
    {
      title: "Motion Graphics",
      iconName: "Sparkles",
      tagline: "Dynamic visual flair & kinetic energy",
      description:
        "Clean motion graphics, animated typography, transitions and visual elements that elevate production value.",
      deliverables: [
        "Animated kinetic typography & kinetic titles",
        "Custom branded lower thirds & logo stings",
        "Infographic animations & visual callouts",
        "Smooth cinematic transition design",
      ],
      aspectRatio: "Adaptive Motion",
    },
    {
      title: "Graphic Design",
      iconName: "Palette",
      tagline: "Thumbnails and visual assets that demand clicks",
      description:
        "Creative graphics and visual assets that maintain a consistent visual identity.",
      deliverables: [
        "High-CTR custom YouTube thumbnails",
        "Channel art, banners & social headers",
        "Poster layouts & visual moodboards",
        "Cohesive brand color & font hierarchy",
      ],
      aspectRatio: "Visual Branding",
    },
    {
      title: "YouTube Editing",
      iconName: "PlaySquare",
      tagline: "Watch time, retention, and viewer loyalty",
      description:
        "Long-form YouTube videos optimized to retain audience attention and drive higher average view duration.",
      deliverables: [
        "First 30-second retention hook design",
        "Pattern interrupts & pacing shifts",
        "Sound effects layering & music curation",
        "Chapter marker organization & end screens",
      ],
      aspectRatio: "16:9 4K / HD",
    },
    {
      title: "Short-form Content",
      iconName: "Smartphone",
      tagline: "Scroll-stopping vertical narratives",
      description:
        "Reels, Shorts and social media content designed to capture attention quickly.",
      deliverables: [
        "Snappy 3-second visual hook execution",
        "Stylized animated subtitles & captions",
        "Fast-paced sound effects and zoom transitions",
        "Optimized 9:16 framing for Instagram & TikTok",
      ],
      aspectRatio: "9:16 Vertical",
    },
  ];

  for (let i = 0; i < services.length; i++) {
    const svc = services[i];
    const { deliverables, ...serviceData } = svc;
    const service = await prisma.service.upsert({
      where: { id: `service-${i}` },
      update: { ...serviceData, order: i },
      create: { id: `service-${i}`, ...serviceData, order: i },
    });

    for (let j = 0; j < deliverables.length; j++) {
      await prisma.serviceDeliverable.upsert({
        where: { id: `del-${i}-${j}` },
        update: { text: deliverables[j] },
        create: {
          id: `del-${i}-${j}`,
          serviceId: service.id,
          text: deliverables[j],
          order: j,
        },
      });
    }
  }

  // Skills
  const skills = [
    {
      name: "Video Editing",
      category: "Core Editing",
      shortDescription: "Precision assembly, pacing, sound sync, and dynamic narrative cutting.",
      highlights: ["Rhythm & Pacing", "Seamless Cuts", "Multi-cam Sync", "Audio Design"],
      badge: "Primary Discipline",
    },
    {
      name: "Motion Graphics",
      category: "Motion & Design",
      shortDescription: "Clean animated typography, dynamic titles, lower thirds, and smooth visual transitions.",
      highlights: ["Kinetic Typography", "Title Sequences", "Custom Transitions", "Visual Accents"],
      badge: "Creative Motion",
    },
    {
      name: "Graphic Design",
      category: "Motion & Design",
      shortDescription: "Striking thumbnail art, branding assets, poster layouts, and cohesive visual identities.",
      highlights: ["High-CTR Thumbnails", "Brand Cohesion", "Color Theory", "Composition"],
      badge: "Visual Identity",
    },
    {
      name: "Visual Storytelling",
      category: "Storytelling & Formats",
      shortDescription: "Structuring visual arcs that keep viewers emotionally invested from the first frame.",
      highlights: ["Narrative Arcs", "Hook Optimization", "Emotional Beats", "B-Roll Weaving"],
      badge: "Narrative Depth",
    },
    {
      name: "Short-form Content",
      category: "Storytelling & Formats",
      shortDescription: "High-retention Reels, TikToks, and Shorts engineered for modern attention spans.",
      highlights: ["3-Second Hooks", "Fast-Paced Motion", "Dynamic Subtitles", "9:16 Framing"],
      badge: "Viral Retention",
    },
    {
      name: "YouTube Editing",
      category: "Storytelling & Formats",
      shortDescription: "Long-form pacing that boosts audience retention, watch time, and click-through metrics.",
      highlights: ["Viewer Retention", "Pattern Interrupts", "Sound FX Styling", "Chapter Pacing"],
      badge: "Audience Growth",
    },
    {
      name: "Documentary Editing",
      category: "Core Editing",
      shortDescription: "Atmospheric, investigative, and cinematic documentary cuts with rich historical or character depth.",
      highlights: ["Cinematic Mood", "Archive Integration", "Soundscapes", "Pacing Restraint"],
      badge: "Cinematic Style",
    },
    {
      name: "Creative Direction",
      category: "Motion & Design",
      shortDescription: "Translating concepts into a unified visual style with cohesive tone, color, and pacing.",
      highlights: ["Style Curation", "Moodboards", "Concept Development", "Visual Consistency"],
      badge: "Vision & Tone",
    },
  ];

  for (let i = 0; i < skills.length; i++) {
    const sk = skills[i];
    const { highlights, ...skillData } = sk;
    const skill = await prisma.skill.upsert({
      where: { id: `skill-${i}` },
      update: { ...skillData, order: i, level: 80 },
      create: { id: `skill-${i}`, ...skillData, order: i, level: 80 },
    });

    for (let j = 0; j < highlights.length; j++) {
      await prisma.skillHighlight.upsert({
        where: { id: `hl-${i}-${j}` },
        update: { text: highlights[j] },
        create: {
          id: `hl-${i}-${j}`,
          skillId: skill.id,
          text: highlights[j],
          order: j,
        },
      });
    }
  }

  // Projects
  const projects = [
    {
      title: "Urban Pulse — Shadows & Stories",
      category: "Documentary",
      shortDescription: "A mood-heavy documentary exploration balancing rhythmic b-roll cuts with intimate audio testimonials.",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "04:32",
      aspectRatio: "21:9",
      year: "2024",
      featured: true,
      tools: ["Color Grading", "Sound Design", "Narrative Arc"],
      clientBrief: "A cinematic short documentary aimed at capturing the raw energy, nighttime street culture, and unseen human stories of an urban metropolis.",
      myRole: "Lead Video Editor, Audio Synchronizer & Color Stylist.",
      creativeApproach: "Employed dynamic J-cuts and L-cuts to lead the viewer into transitions.",
      finalResult: "A hypnotic, emotionally grounded narrative cut.",
      isPlaceholder: true,
    },
    {
      title: "Verve Kinetic — Identity Motion Reel",
      category: "Motion Graphics",
      shortDescription: "High-energy kinetic typography, abstract geometry, and branded motion system.",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "01:15",
      aspectRatio: "16:9",
      year: "2024",
      featured: true,
      tools: ["Kinetic Typography", "Title Design", "Visual Rhythm"],
      clientBrief: "Create a sleek, high-tempo brand motion identity.",
      myRole: "Motion Graphics Designer.",
      creativeApproach: "Focused on buttery-smooth custom easing curves.",
      finalResult: "An attention-demanding motion sequence.",
      isPlaceholder: true,
    },
    {
      title: "Inside The Machine — Tech Deep Dive",
      category: "YouTube",
      shortDescription: "A fast-paced, retention-optimized YouTube video with bespoke sound effects.",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "11:45",
      aspectRatio: "16:9",
      year: "2024",
      featured: true,
      tools: ["Retention Editing", "SFX Layering", "Pattern Interrupts"],
      clientBrief: "Edit a 12-minute complex technical breakdown.",
      myRole: "Full YouTube Editor.",
      creativeApproach: "Crafted an explosive first 30 seconds.",
      finalResult: "A fluid video with over 60% average retention.",
      isPlaceholder: true,
    },
    {
      title: "Apex Velocity — 9:16 Retention Reel",
      category: "Short-form",
      shortDescription: "Punchy short-form edit engineered for maximum watch-time.",
      thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "00:45",
      aspectRatio: "9:16",
      year: "2024",
      featured: true,
      tools: ["Shorts/Reels", "Animated Subtitles", "Fast Hooks"],
      clientBrief: "Produce a viral-ready short-form video.",
      myRole: "Video Editor & Subtitle Animator.",
      creativeApproach: "Designed a visual loop.",
      finalResult: "Captivating scroll-stopping content.",
      isPlaceholder: true,
    },
    {
      title: "Golden Hour Odyssey — Narrative Short",
      category: "Video Editing",
      shortDescription: "An emotive cinematic narrative emphasizing color harmony.",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "03:10",
      aspectRatio: "16:9",
      year: "2024",
      featured: false,
      tools: ["Color Harmony", "Cinematic Cut", "Audio Ambiance"],
      clientBrief: "Create a visual mood piece.",
      myRole: "Editor and Colorist.",
      creativeApproach: "Cut to the rhythmic breath of the musical score.",
      finalResult: "A rich, atmospheric piece.",
      isPlaceholder: true,
    },
    {
      title: "Echoes of Heritage — Archival Journey",
      category: "Documentary",
      shortDescription: "Restoration and dynamic animation of archival photography.",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      videoType: "youtube",
      duration: "07:20",
      aspectRatio: "16:9",
      year: "2024",
      featured: false,
      tools: ["2.5D Parallax", "Archival Treatment", "Atmospheric SFX"],
      clientBrief: "Transform flat historical photographs.",
      myRole: "Editor & Motion Specialist.",
      creativeApproach: "Layered 3D camera depth.",
      finalResult: "Elevated historical narrative.",
      isPlaceholder: true,
    },
  ];

  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    const { tools, ...projectData } = proj;
    const project = await prisma.project.upsert({
      where: { id: `project-${i}` },
      update: { ...projectData, order: i },
      create: { id: `project-${i}`, ...projectData, order: i },
    });

    for (let j = 0; j < tools.length; j++) {
      await prisma.projectTool.upsert({
        where: { id: `tool-${i}-${j}` },
        update: { name: tools[j] },
        create: {
          id: `tool-${i}-${j}`,
          projectId: project.id,
          name: tools[j],
          order: j,
        },
      });
    }
  }

  // Testimonials
  const testimonials = [
    {
      clientName: "Client Feedback Slot #1",
      clientRole: "YouTube Creator / Channel Producer",
      projectType: "Long-form YouTube Editing",
      quote: "Client testimonial will be added here once provided.",
      isPlaceholder: true,
    },
    {
      clientName: "Client Feedback Slot #2",
      clientRole: "Brand Director / Content Lead",
      projectType: "Motion Graphics & Social Ads",
      quote: "Client testimonial will be added here once provided.",
      isPlaceholder: true,
    },
    {
      clientName: "Client Feedback Slot #3",
      clientRole: "Documentary Filmmaker / Creator",
      projectType: "Documentary Visual Storytelling",
      quote: "Client testimonial will be added here once provided.",
      isPlaceholder: true,
    },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${i}` },
      update: {},
      create: { id: `testimonial-${i}`, ...testimonials[i], order: i, rating: 5 },
    });
  }

  // Social Links
  const socials = [
    { name: "YouTube", iconName: "Youtube", handle: "@yeasinedits" },
    { name: "Instagram", iconName: "Instagram", handle: "@yeasin.edits" },
    { name: "LinkedIn", iconName: "Linkedin", handle: "Md Yeasin Arafat" },
    { name: "Facebook", iconName: "Facebook", handle: "Yeasin Arafat" },
    { name: "Behance", iconName: "Behance", handle: "yeasinedits" },
    { name: "Dribbble", iconName: "Dribbble", handle: "yeasinedits" },
  ];

  for (let i = 0; i < socials.length; i++) {
    await prisma.socialLink.upsert({
      where: { id: `social-${i}` },
      update: {},
      create: { id: `social-${i}`, ...socials[i], order: i },
    });
  }

  // Contact
  await prisma.contact.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heading: "Let's Create Something Great.",
      description: "Have a project in mind? Let's turn your idea into something people want to watch.",
      ctaText: "Send Inquiry",
      name: "Md Yeasin Arafat",
      role: "Video Editor & Motion Graphics Designer",
      status: "Available for Freelance Projects",
      location: "Bangladesh",
      timezone: "GMT+6 (BST)",
      turnaround: "Fast Turnaround & Clear Communication",
    },
  });

  // Footer
  const footer = await prisma.footer.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      description:
        "Focused on visual storytelling, high-retention video pacing, and modern motion graphics.",
      copyright: "© 2026 Md Yeasin Arafat. All rights reserved.",
      logoText: "MYA",
      tagline: "Video Editor & Motion Graphics Designer",
    },
  });

  const footerLinks = [
    { name: "Home", url: "#hero" },
    { name: "About", url: "#about" },
    { name: "Services", url: "#services" },
    { name: "Work", url: "#work" },
    { name: "Why Me", url: "#why-me" },
    { name: "Testimonials", url: "#testimonials" },
    { name: "Contact", url: "#contact" },
  ];

  for (let i = 0; i < footerLinks.length; i++) {
    await prisma.footerLink.upsert({
      where: { id: `footer-link-${i}` },
      update: {},
      create: {
        id: `footer-link-${i}`,
        footerId: footer.id,
        ...footerLinks[i],
        order: i,
      },
    });
  }

  // SEO
  await prisma.sEO.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      metaTitle: "Md Yeasin Arafat — Video Editor & Motion Graphics Designer",
      metaDescription:
        "Portfolio of Md Yeasin Arafat, a video editor and motion graphics enthusiast creating engaging, modern and visually compelling content.",
      keywords:
        "Md Yeasin Arafat, Video Editor, Motion Graphics Designer, YouTube Video Editing, Short-form Content, Reels Editor, Cinematic Documentary Editor, Visual Storytelling, Creative Director Bangladesh",
      ogTitle: "Md Yeasin Arafat — Video Editor & Motion Graphics Designer",
      ogDescription:
        "Portfolio of Md Yeasin Arafat, a video editor and motion graphics enthusiast creating engaging, modern and visually compelling content.",
      ogImage:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      canonicalUrl: "https://mdyeasinarafat.com",
    },
  });

  // Why Work With Me
  const whyItems = [
    {
      number: "01",
      title: "Creative Approach",
      description: "I don't just cut clips together. I focus on pacing, storytelling, and visual flow.",
      highlight: "Storytelling over mechanical cutting",
      icon: "Zap",
    },
    {
      number: "02",
      title: "Reliable Delivery",
      description: "I take deadlines seriously and aim to deliver projects on time.",
      highlight: "Dependable timelines & clear updates",
      icon: "ShieldCheck",
    },
    {
      number: "03",
      title: "Client-Focused",
      description: "The final result should match your vision and expectations.",
      highlight: "Collaborative revision process",
      icon: "HeartHandshake",
    },
    {
      number: "04",
      title: "Continuous Improvement",
      description: "I continuously improve my video editing, motion graphics, and design skills.",
      highlight: "Constantly raising production standards",
      icon: "Target",
    },
    {
      number: "05",
      title: "Attention To Detail",
      description: "I care about small details that make an edit feel polished and professional.",
      highlight: "Frame-by-frame precision",
      icon: "Sliders",
    },
  ];

  for (let i = 0; i < whyItems.length; i++) {
    await prisma.whyWorkItem.upsert({
      where: { id: `why-${i}` },
      update: {},
      create: { id: `why-${i}`, ...whyItems[i], order: i },
    });
  }

  // Marquee Items
  const marqueeItems = [
    "VIDEO EDITING",
    "MOTION GRAPHICS",
    "VISUAL STORYTELLING",
    "HIGH RETENTION PACING",
    "SOUND DESIGN & SYNC",
    "COLOR GRADING",
    "DOCUMENTARY CUTS",
    "KINETIC TYPOGRAPHY",
    "YOUTUBE OPTIMIZATION",
    "CREATIVE CONTENT",
  ];

  for (let i = 0; i < marqueeItems.length; i++) {
    await prisma.marqueeItem.upsert({
      where: { id: `marquee-${i}` },
      update: {},
      create: { id: `marquee-${i}`, text: marqueeItems[i], order: i },
    });
  }

  // CTA
  await prisma.cTA.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      badgeText: "HAVE AN IDEA?",
      title: "Let's Turn It Into A Video.",
      description:
        "Whether it's a high-retention YouTube cut, a dynamic motion graphics reel, or an emotional documentary narrative.",
      buttonText: "Start A Project",
      buttonUrl: "#contact",
      noteText: "Currently booking freelance projects for this month",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    // Print just the message for expected config errors so the output stays
    // readable, and never echo any secret value.
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
