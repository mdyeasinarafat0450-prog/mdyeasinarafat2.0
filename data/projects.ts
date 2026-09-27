/**
 * =======================================================================
 * CMS-STYLE PORTFOLIO PROJECTS DATA
 * =======================================================================
 * To add a new project, simply add an object to this array.
 * No need to modify any UI components!
 * 
 * Supported categories:
 * - "Video Editing"
 * - "Motion Graphics"
 * - "YouTube"
 * - "Short-form"
 * - "Documentary"
 */

export interface ProjectItem {
  id: string;
  title: string;
  category: "Video Editing" | "Motion Graphics" | "YouTube" | "Short-form" | "Documentary";
  shortDescription: string;
  thumbnail: string;
  videoUrl?: string; // YouTube embed / video link (e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ" or direct mp4)
  embedUrl?: string; // Direct iframe embed URL if custom
  videoType?: "youtube" | "vimeo" | "mp4" | "embed";
  duration?: string;
  aspectRatio?: "16:9" | "9:16" | "4:5" | "21:9";
  year?: string;
  featured?: boolean;
  tools?: string[]; // Optional editing tools/software
  
  // Detailed modal case study fields:
  clientBrief?: string;
  myRole?: string;
  creativeApproach?: string;
  finalResult?: string;
  isPlaceholder?: boolean; // Set to true for sample template projects
}

export const projectCategories = [
  "All",
  "Video Editing",
  "Motion Graphics",
  "YouTube",
  "Short-form",
  "Documentary",
] as const;

export const projectsData: ProjectItem[] = [
  {
    id: "cinematic-documentary-urban-pulse",
    title: "Urban Pulse — Shadows & Stories",
    category: "Documentary",
    shortDescription:
      "A mood-heavy documentary exploration balancing rhythmic b-roll cuts with intimate audio testimonials.",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your YouTube URL
    videoType: "youtube",
    duration: "04:32",
    aspectRatio: "21:9",
    year: "2024",
    featured: true,
    tools: ["Color Grading", "Sound Design", "Narrative Arc"],
    clientBrief:
      "A cinematic short documentary aimed at capturing the raw energy, nighttime street culture, and unseen human stories of an urban metropolis.",
    myRole:
      "Lead Video Editor, Audio Synchronizer & Color Stylist. Structured the narrative flow from hours of raw handheld footage.",
    creativeApproach:
      "Employed dynamic J-cuts and L-cuts to lead the viewer into transitions before visual shifts occurred. Kept natural ambient street sounds paired with a subtle, low-frequency atmospheric drone score.",
    finalResult:
      "A hypnotic, emotionally grounded narrative cut that maintains viewer retention through thoughtful pacing without relying on jarring cuts.",
    isPlaceholder: true,
  },
  {
    id: "kinetic-brand-identity-motion",
    title: "Verve Kinetic — Identity Motion Reel",
    category: "Motion Graphics",
    shortDescription:
      "High-energy kinetic typography, abstract geometry, and branded motion system.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube",
    duration: "01:15",
    aspectRatio: "16:9",
    year: "2024",
    featured: true,
    tools: ["Kinetic Typography", "Title Design", "Visual Rhythm"],
    clientBrief:
      "Create a sleek, high-tempo brand motion identity to introduce modern digital brand pillars in an impactful, punchy format.",
    myRole:
      "Motion Graphics Designer. Responsible for concept storyboards, vector animation, easing curves, and kinetic typography sequencing.",
    creativeApproach:
      "Focused on buttery-smooth custom easing curves, bold typographic hierarchy, and micro-accents that synchronize precisely with audio percussion hits.",
    finalResult:
      "An attention-demanding motion sequence providing an immediate modern agency aesthetic.",
    isPlaceholder: true,
  },
  {
    id: "high-retention-youtube-deepdive",
    title: "Inside The Machine — Tech Deep Dive",
    category: "YouTube",
    shortDescription:
      "A fast-paced, retention-optimized YouTube video with bespoke sound effects and visual pattern interrupts.",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube",
    duration: "11:45",
    aspectRatio: "16:9",
    year: "2024",
    featured: true,
    tools: ["Retention Editing", "SFX Layering", "Pattern Interrupts"],
    clientBrief:
      "Edit a 12-minute complex technical breakdown into an entertaining, easy-to-follow YouTube video that maintains high viewer retention throughout.",
    myRole:
      "Full YouTube Editor. Script review, cutdown from 45 minutes of raw footage, b-roll research, sound FX design, and pacing optimization.",
    creativeApproach:
      "Crafted an explosive first 30 seconds that hooks curiosity immediately. Implemented strategic pattern interrupts every 4 to 6 seconds to prevent viewer drop-off.",
    finalResult:
      "A fluid video with over 60% average retention rate across testing, significantly outperforming previous channel averages.",
    isPlaceholder: true,
  },
  {
    id: "viral-vertical-short-form",
    title: "Apex Velocity — 9:16 Retention Reel",
    category: "Short-form",
    shortDescription:
      "Punchy short-form edit engineered for maximum watch-time, dynamic animated captions, and rhythmic zooms.",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube",
    duration: "00:45",
    aspectRatio: "9:16",
    year: "2024",
    featured: true,
    tools: ["Shorts/Reels", "Animated Subtitles", "Fast Hooks"],
    clientBrief:
      "Produce a viral-ready short-form video for Instagram Reels and YouTube Shorts highlighting creative production workflows.",
    myRole:
      "Video Editor & Subtitle Animator. Handled audio cleanup, punch-ins, sound design, and text animation.",
    creativeApproach:
      "Designed a visual loop so the end flows seamlessly back into the hook. Added bold color-highlighted subtitles with pop animations on key keywords.",
    finalResult:
      "Captivating scroll-stopping content designed to keep viewers replaying the video.",
    isPlaceholder: true,
  },
  {
    id: "cinematic-color-storytelling",
    title: "Golden Hour Odyssey — Narrative Short",
    category: "Video Editing",
    shortDescription:
      "An emotive cinematic narrative emphasizing color harmony, dramatic pacing, and audio atmosphere.",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube",
    duration: "03:10",
    aspectRatio: "16:9",
    year: "2024",
    featured: false,
    tools: ["Color Harmony", "Cinematic Cut", "Audio Ambiance"],
    clientBrief:
      "Create a visual mood piece centered around human reflection, travel, and dramatic landscape transitions.",
    myRole:
      "Editor and Colorist. Selected the best takes, balanced exposure across mixed lighting scenarios, and shaped musical cadence.",
    creativeApproach:
      "Cut to the rhythmic breath of the musical score rather than strict downbeats, allowing scenes to linger and evoke genuine emotion.",
    finalResult:
      "A rich, atmospheric piece demonstrating patience, composition appreciation, and subtle visual storytelling.",
    isPlaceholder: true,
  },
  {
    id: "historical-archive-documentary",
    title: "Echoes of Heritage — Archival Journey",
    category: "Documentary",
    shortDescription:
      "Restoration and dynamic animation of archival photography blended with contemporary cinematic footage.",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube",
    duration: "07:20",
    aspectRatio: "16:9",
    year: "2024",
    featured: false,
    tools: ["2.5D Parallax", "Archival Treatment", "Atmospheric SFX"],
    clientBrief:
      "Transform flat historical photographs and historical documents into a dynamic visual documentary chapter.",
    myRole:
      "Editor & Motion Specialist. Performed 2.5D parallax separation, dust/scratches texture overlay, and camera camera projections.",
    creativeApproach:
      "Layered 3D camera depth to vintage photos so still images felt like moving, breathing cinematic moments.",
    finalResult:
      "Elevated historical narrative that feels immersive and respectful to the subject matter.",
    isPlaceholder: true,
  },
];
