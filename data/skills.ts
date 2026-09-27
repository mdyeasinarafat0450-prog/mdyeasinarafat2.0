export interface SkillItem {
  id: string;
  name: string;
  category: "Core Editing" | "Motion & Design" | "Storytelling & Formats";
  shortDescription: string;
  highlights: string[];
  badge: string;
}

export const skillsData: SkillItem[] = [
  {
    id: "video-editing",
    name: "Video Editing",
    category: "Core Editing",
    shortDescription: "Precision assembly, pacing, sound sync, and dynamic narrative cutting.",
    highlights: ["Rhythm & Pacing", "Seamless Cuts", "Multi-cam Sync", "Audio Design"],
    badge: "Primary Discipline",
  },
  {
    id: "motion-graphics",
    name: "Motion Graphics",
    category: "Motion & Design",
    shortDescription: "Clean animated typography, dynamic titles, lower thirds, and smooth visual transitions.",
    highlights: ["Kinetic Typography", "Title Sequences", "Custom Transitions", "Visual Accents"],
    badge: "Creative Motion",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    category: "Motion & Design",
    shortDescription: "Striking thumbnail art, branding assets, poster layouts, and cohesive visual identities.",
    highlights: ["High-CTR Thumbnails", "Brand Cohesion", "Color Theory", "Composition"],
    badge: "Visual Identity",
  },
  {
    id: "visual-storytelling",
    name: "Visual Storytelling",
    category: "Storytelling & Formats",
    shortDescription: "Structuring visual arcs that keep viewers emotionally invested from the first frame.",
    highlights: ["Narrative Arcs", "Hook Optimization", "Emotional Beats", "B-Roll Weaving"],
    badge: "Narrative Depth",
  },
  {
    id: "short-form-content",
    name: "Short-form Content",
    category: "Storytelling & Formats",
    shortDescription: "High-retention Reels, TikToks, and Shorts engineered for modern attention spans.",
    highlights: ["3-Second Hooks", "Fast-Paced Motion", "Dynamic Subtitles", "9:16 Framing"],
    badge: "Viral Retention",
  },
  {
    id: "youtube-editing",
    name: "YouTube Editing",
    category: "Storytelling & Formats",
    shortDescription: "Long-form pacing that boosts audience retention, watch time, and click-through metrics.",
    highlights: ["Viewer Retention", "Pattern Interrupts", "Sound FX Styling", "Chapter Pacing"],
    badge: "Audience Growth",
  },
  {
    id: "documentary-editing",
    name: "Documentary Editing",
    category: "Core Editing",
    shortDescription: "Atmospheric, investigative, and cinematic documentary cuts with rich historical or character depth.",
    highlights: ["Cinematic Mood", "Archive Integration", "Soundscapes", "Pacing Restraint"],
    badge: "Cinematic Style",
  },
  {
    id: "creative-direction",
    name: "Creative Direction",
    category: "Motion & Design",
    shortDescription: "Translating concepts into a unified visual style with cohesive tone, color, and pacing.",
    highlights: ["Style Curation", "Moodboards", "Concept Development", "Visual Consistency"],
    badge: "Vision & Tone",
  },
];

export const skillCategories = [
  "All",
  "Core Editing",
  "Motion & Design",
  "Storytelling & Formats",
] as const;
