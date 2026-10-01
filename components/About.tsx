"use client";

import { motion } from "framer-motion";
import { Lightbulb, Sparkles, TrendingUp, Compass, Film, ArrowUpRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { useContent } from "@/lib/use-content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  Sparkles,
  TrendingUp,
  Compass,
};

export default function About() {
  const { data, loading } = useContent();
  const about = data.about;

  if (loading || !about) {
    return (
      <section id="about" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start mb-16">
            <div className="w-24 h-6 bg-white/[0.04] rounded-full mb-4 animate-pulse" />
            <div className="w-64 h-10 bg-white/[0.04] rounded-xl mb-4 animate-pulse" />
            <div className="w-20 h-1 bg-cinema-accent mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <div className="w-full h-64 bg-white/[0.04] rounded-2xl animate-pulse" />
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-40 bg-white/[0.04] rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const pillars = (about.pillars as Array<Record<string, unknown>>) || [];

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>01 / ABOUT ME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {about.title as string}
          </h2>
          <div className="w-20 h-1 bg-cinema-accent mt-4 rounded-full" />
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-cinema-panel/70 border border-cinema-border backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cinema-accent/5 rounded-full blur-2xl pointer-events-none" />

              <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed mb-6">
                &ldquo;{about.description as string}&rdquo;
              </p>

              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base">
                <p>{about.longBio as string}</p>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-400">STATUS</p>
                  <p className="text-sm font-semibold text-white">
                    {about.statusText as string}
                  </p>
                </div>

                <MagneticButton
                  href={about.ctaUrl as string}
                  variant="outline"
                  className="text-xs !py-2 !px-4 gap-1.5"
                >
                  <span>{about.ctaText as string}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mindset Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar: Record<string, unknown>, idx: number) => {
              const Icon = iconMap[pillar.icon as string] || Lightbulb;
              return (
                <motion.div
                  key={pillar.id as string}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-cinema-panel/50 border border-cinema-border hover:border-cinema-accent/40 transition-all group hover:-translate-y-1 relative"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-100 border border-cinema-border flex items-center justify-center text-cinema-accent mb-4 group-hover:scale-110 group-hover:bg-cinema-accent group-hover:text-white transition-all shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-mono text-cinema-amber uppercase tracking-wider block mb-1">
                    {pillar.subtitle as string}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cinema-accent transition-colors">
                    {pillar.title as string}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.description as string}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
