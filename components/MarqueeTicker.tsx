"use client";

import { motion } from "framer-motion";

const items = [
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

export default function MarqueeTicker() {
  return (
    <div className="py-4 border-y border-cinema-border/70 bg-cinema-black/80 backdrop-blur-sm overflow-hidden relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cinema-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cinema-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-8">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
