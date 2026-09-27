"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.04] z-[100] pointer-events-none">
      {/* Active Timeline Track */}
      <motion.div
        className="h-full bg-gradient-to-r from-cinema-amber via-cinema-accent to-cinema-accent origin-left relative shadow-[0_0_12px_rgba(255,51,75,0.7)]"
        style={{ scaleX }}
      >
        {/* Playhead indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </motion.div>

      {/* Subtle Frame/Percentage Counter (Top Right Corner) */}
      <div className="absolute right-4 top-2 hidden md:flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 tracking-wider">
        <span className="text-zinc-600">SCRUB:</span>
        <span className="text-cinema-accent font-semibold">{percentage.toString().padStart(2, "0")}%</span>
      </div>
    </div>
  );
}
