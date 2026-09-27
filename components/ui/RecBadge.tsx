"use client";

import { useEffect, useState } from "react";

interface RecBadgeProps {
  label?: string;
  showTimecode?: boolean;
  className?: string;
}

export default function RecBadge({
  label = "AVAILABLE FOR FREELANCE",
  showTimecode = true,
  className = "",
}: RecBadgeProps) {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    // Generate an authentic running video timecode based on current time
    const interval = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, "0");
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
    }, 1000 / 24); // 24 FPS ticker

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-cinema-panel/80 border border-cinema-border backdrop-blur-md text-xs font-mono text-zinc-300 shadow-lg ${className}`}
    >
      {/* Blinking REC dot */}
      <span className="flex items-center gap-1.5 text-cinema-accent font-semibold tracking-wider">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cinema-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cinema-accent shadow-[0_0_8px_#FF334B]"></span>
        </span>
        <span>REC</span>
      </span>

      <span className="h-3 w-px bg-white/10" />

      {/* Label */}
      <span className="font-sans font-medium text-zinc-300 tracking-wide">{label}</span>

      {showTimecode && (
        <>
          <span className="h-3 w-px bg-white/10 hidden sm:block" />
          <span className="text-zinc-500 hidden sm:inline-block font-mono tracking-widest text-[11px]">
            TC {timecode}
          </span>
        </>
      )}
    </div>
  );
}
