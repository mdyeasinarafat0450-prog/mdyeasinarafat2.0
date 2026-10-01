"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, Scissors, Layers, Volume2, Film } from "lucide-react";
import RecBadge from "./ui/RecBadge";
import MagneticButton from "./ui/MagneticButton";
import { useContent } from "@/lib/use-content";

export default function Hero() {
  const { data, loading } = useContent();
  const hero = data.hero;

  if (loading || !hero) {
    return (
      <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="mb-6 w-64 h-8 bg-white/[0.04] rounded-full animate-pulse" />
              <div className="w-full h-16 bg-white/[0.04] rounded-xl mb-6 animate-pulse" />
              <div className="w-3/4 h-6 bg-white/[0.04] rounded-lg mb-8 animate-pulse" />
              <div className="flex gap-4 mb-10">
                <div className="w-32 h-12 bg-white/[0.04] rounded-xl animate-pulse" />
                <div className="w-40 h-12 bg-white/[0.04] rounded-xl animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="w-full aspect-[16/10] bg-white/[0.04] rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden timeline-grid"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left:1/4 -translate-x-1/2 w-96 h-96 bg-cinema-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-cinema-amber/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Live REC Status Badge */}
            <div className="mb-6">
              <RecBadge label={hero.badgeText as string} showTimecode={true} />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              {hero.title as string}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {hero.description as string}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <MagneticButton
                href={hero.ctaUrl as string}
                variant="primary"
                className="gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{hero.ctaText as string}</span>
              </MagneticButton>

              <MagneticButton
                href={hero.secondaryCtaUrl as string}
                variant="secondary"
                className="gap-2 px-6 py-3.5 text-sm sm:text-base font-medium"
              >
                <span>{hero.secondaryCtaText as string}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </MagneticButton>
            </div>

            {/* Professional quick spec stats */}
            <div className="pt-6 border-t border-cinema-border w-full grid grid-cols-3 gap-4 max-w-md">
              <div>
                <span className="block font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                  {hero.stat1Label as string}
                </span>
                <span className="font-medium text-xs sm:text-sm text-zinc-200">
                  {hero.stat1Value as string}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                  {hero.stat2Label as string}
                </span>
                <span className="font-medium text-xs sm:text-sm text-zinc-200">
                  {hero.stat2Value as string}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                  {hero.stat3Label as string}
                </span>
                <span className="font-medium text-xs sm:text-sm text-zinc-200">
                  {hero.stat3Value as string}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Cinematic Editor Interface Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Monitor Frame */}
            <div className="relative rounded-2xl bg-cinema-panel border border-cinema-border p-3 sm:p-4 shadow-2xl backdrop-blur-xl overflow-hidden group">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cinema-border text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cinema-accent" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cinema-amber" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-zinc-300 font-semibold tracking-wide">
                    SEQUENCE_01.prproj
                  </span>
                </div>
                <span className="text-cinema-amber font-semibold">4K UHD • 23.976 fps</span>
              </div>

              {/* Video Monitor Area */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-cinema-black border border-white/[0.04]">
                <img
                  src={hero.heroImage as string}
                  alt="Cinematic Editing Preview"
                  className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105 filter contrast-125"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 via-transparent to-cinema-black/40 pointer-events-none" />

                {/* On-screen Display (OSD) Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90">
                  <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    RAW LOG • REC.709
                  </span>
                  <span className="bg-cinema-accent/90 text-white px-2 py-0.5 rounded font-bold shadow-[0_0_8px_#FF334B]">
                    PLAYING
                  </span>
                </div>

                {/* Crosshairs & Safe Margins */}
                <div className="absolute inset-6 border border-white/10 rounded-sm pointer-events-none flex items-center justify-center">
                  <div className="w-4 h-4 border-t border-b border-white/20" />
                  <div className="w-4 h-4 border-l border-r border-white/20 absolute" />
                </div>

                {/* Bottom OSD Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                  <span className="text-white font-semibold">TC: 01:14:28:16</span>
                  <span className="text-cinema-amber">AUDIO -12dB OK</span>
                </div>
              </div>

              {/* Editing Timeline Simulation */}
              <div className="mt-4 pt-3 border-t border-cinema-border/70 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Scissors className="w-3 h-3 text-cinema-accent" />
                    TIMELINE TRACKS
                  </span>
                  <span>SNAPPING ON</span>
                </div>

                {/* Video Track 1 */}
                <div className="h-6 rounded bg-surface-200/90 border border-white/[0.04] p-1 flex items-center gap-1 overflow-hidden">
                  <span className="text-[9px] font-mono text-zinc-500 w-5">V1</span>
                  <div className="h-full flex-1 rounded bg-indigo-950/70 border border-indigo-500/30 px-2 flex items-center justify-between text-[9px] font-mono text-indigo-200">
                    <span>Main_Narration_A-Roll</span>
                    <span className="text-indigo-400">03:42</span>
                  </div>
                  <div className="h-full w-24 rounded bg-cinema-accent/30 border border-cinema-accent/40 px-1.5 flex items-center text-[9px] font-mono text-rose-200">
                    <span>B-Roll_Cut</span>
                  </div>
                </div>

                {/* Video Track 2 - Motion & Graphics */}
                <div className="h-6 rounded bg-surface-200/90 border border-white/[0.04] p-1 flex items-center gap-1 overflow-hidden">
                  <span className="text-[9px] font-mono text-zinc-500 w-5">V2</span>
                  <div className="h-full w-20 rounded bg-amber-950/70 border border-amber-500/30 px-1.5 flex items-center text-[9px] font-mono text-amber-200">
                    <span>Kinetic_Title</span>
                  </div>
                  <div className="h-full flex-1 rounded bg-surface-100/50 border border-white/[0.05]" />
                  <div className="h-full w-28 rounded bg-emerald-950/70 border border-emerald-500/30 px-1.5 flex items-center text-[9px] font-mono text-emerald-200">
                    <span>Callout_Overlay</span>
                  </div>
                </div>

                {/* Audio Track */}
                <div className="h-6 rounded bg-surface-200/90 border border-white/[0.04] p-1 flex items-center gap-1 overflow-hidden">
                  <span className="text-[9px] font-mono text-zinc-500 w-5">A1</span>
                  <div className="h-full flex-1 rounded bg-cyan-950/70 border border-cyan-500/30 px-2 flex items-center justify-between text-[9px] font-mono text-cyan-200">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-2.5 h-2.5" />
                      Score_Ambience_Mix.wav
                    </span>
                    <span className="text-cyan-400">-14 LUFS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating creative pill badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-cinema-panel/95 border border-cinema-border rounded-xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-cinema-accent/15 border border-cinema-accent/30 flex items-center justify-center text-cinema-accent">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Engaging Storytelling</p>
                <p className="text-[11px] text-zinc-400">Pacing • Motion • Retention</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
