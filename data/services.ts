export interface ServiceItem {
  id: string;
  title: string;
  iconName: "Video" | "Sparkles" | "Palette" | "PlaySquare" | "Smartphone";
  tagline: string;
  description: string;
  deliverables: string[];
  aspectRatio: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    iconName: "Video",
    tagline: "Rhythm, pacing, and emotional resonance",
    description:
      "Engaging and polished edits designed around storytelling, pacing, rhythm and audience retention. Every cut is intentional, matching sound cues and pacing to draw viewers deep into the narrative.",
    deliverables: [
      "Narrative & story arc structuring",
      "Seamless audio syncing & sound design",
      "Color grading & mood enhancement",
      "Dynamic b-roll integration",
    ],
    aspectRatio: "16:9 / Multi-format",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    iconName: "Sparkles",
    tagline: "Dynamic visual flair & kinetic energy",
    description:
      "Clean motion graphics, animated typography, transitions and visual elements that elevate production value and bring static concepts to life with fluid visual appeal.",
    deliverables: [
      "Animated kinetic typography & kinetic titles",
      "Custom branded lower thirds & logo stings",
      "Infographic animations & visual callouts",
      "Smooth cinematic transition design",
    ],
    aspectRatio: "Adaptive Motion",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    iconName: "Palette",
    tagline: "Thumbnails and visual assets that demand clicks",
    description:
      "Creative graphics and visual assets that maintain a consistent visual identity. High-impact YouTube thumbnails, social covers, and visual branding assets crafted to maximize engagement.",
    deliverables: [
      "High-CTR custom YouTube thumbnails",
      "Channel art, banners & social headers",
      "Poster layouts & visual moodboards",
      "Cohesive brand color & font hierarchy",
    ],
    aspectRatio: "Visual Branding",
  },
  {
    id: "youtube-editing",
    title: "YouTube Editing",
    iconName: "PlaySquare",
    tagline: "Watch time, retention, and viewer loyalty",
    description:
      "Long-form YouTube videos, documentaries, educational content and engaging storytelling edits optimized to retain audience attention and drive higher average view duration.",
    deliverables: [
      "First 30-second retention hook design",
      "Pattern interrupts & pacing shifts",
      "Sound effects layering & music curation",
      "Chapter marker organization & end screens",
    ],
    aspectRatio: "16:9 4K / HD",
  },
  {
    id: "short-form-content",
    title: "Short-form Content",
    iconName: "Smartphone",
    tagline: "Scroll-stopping vertical narratives",
    description:
      "Reels, Shorts and social media content designed to capture attention quickly, maintain rapid pacing, and deliver clear takeaways before the viewer scrolls away.",
    deliverables: [
      "Snappy 3-second visual hook execution",
      "Stylized animated subtitles & captions",
      "Fast-paced sound effects and zoom transitions",
      "Optimized 9:16 framing for Instagram & TikTok",
    ],
    aspectRatio: "9:16 Vertical",
  },
];
