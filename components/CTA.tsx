"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Film } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

export default function CTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-cinema-black">
      {/* Background Animated Ambience */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-gradient-to-tr from-cinema-accent via-cinema-amber to-transparent rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 md:p-16 rounded-3xl bg-gradient-to-b from-cinema-panel/90 to-surface-200/90 border border-cinema-borderBright/60 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center relative overflow-hidden">
          {/* Top Film Frame Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 pointer-events-none" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 pointer-events-none" />

          {/* Supertitle */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs font-mono text-cinema-amber mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HAVE AN IDEA?</span>
          </div>

          {/* Main Statement */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Let&apos;s Turn It Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-accent via-rose-400 to-cinema-amber">
              A Video.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether it&apos;s a high-retention YouTube cut, a dynamic motion graphics reel, or an
            emotional documentary narrative, let&apos;s build something people want to watch.
          </p>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="#contact"
              variant="primary"
              className="text-base sm:text-lg !py-4 !px-8 gap-2 font-bold shadow-[0_0_30px_rgba(255,51,75,0.45)] w-full sm:w-auto"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </MagneticButton>
          </div>

          {/* Availability note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Currently booking freelance projects for this month</span>
          </div>
        </div>
      </div>
    </section>
  );
}
