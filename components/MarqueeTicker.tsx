"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/use-content";

export default function MarqueeTicker() {
  const { data, loading } = useContent();
  const items = data.marqueeItems;

  if (loading || items.length === 0) {
    return (
      <div className="py-4 border-y border-cinema-border/70 bg-cinema-black/80 backdrop-blur-sm overflow-hidden relative select-none">
        <div className="flex w-max animate-marquee gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 whitespace-nowrap">
              <div className="w-24 h-4 bg-white/[0.04] rounded animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent/70" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 border-y border-cinema-border/70 bg-cinema-black/80 backdrop-blur-sm overflow-hidden relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cinema-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cinema-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-8">
        {[...items, ...items].map((item: Record<string, unknown>, idx: number) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors">
              {item.text as string}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
