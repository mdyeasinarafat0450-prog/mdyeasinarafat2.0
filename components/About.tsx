"use client";

import { motion } from "framer-motion";
import { Compass, Lightbulb, TrendingUp, Sparkles, Film, ArrowUpRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const mindsetPillars = [
  {
    icon: Lightbulb,
    title: "Creative Mindset",
    subtitle: "Storytelling & Rhythm",
    description:
      "Approaching every cut with an eye for visual pacing, narrative tension, and emotional connection rather than mechanical assembly.",
  },
  {
    icon: Sparkles,
    title: "Client Experience",
    subtitle: "Practical Delivery",
    description:
      "Hands-on experience translating client briefs into polished, retention-focused video edits and high-impact visual assets.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    subtitle: "Daily Skill Expansion",
    description:
      "Constantly studying advanced editing workflows, color theory, motion design principles, and modern viewer psychology.",
  },
  {
    icon: Compass,
    title: "Future Focused",
    subtitle: "Long-Term Vision",
    description:
      "Committed to building a long-term career in the creative industry and eventually establishing a visionary creative studio of my own.",
  },
];

export default function About() {
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
            Behind The Edit
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
                &ldquo;Editing isn&apos;t just cutting clips together — it&apos;s conducting the rhythm of how an audience feels.&rdquo;
              </p>

              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base">
                <p>
                  I am a student studying Arts with a strong passion for visual creativity. Video
                  editing started as an intense personal curiosity and gradually evolved into a
                  serious craft, practical discipline, and dedicated career direction.
                </p>
                <p>
                  I work with <strong className="text-white">video editing</strong>,{" "}
                  <strong className="text-white">motion graphics</strong>, and{" "}
                  <strong className="text-white">graphic design</strong>. Rather than resting on
                  what I already know, I am continuously improving both my technical execution and
                  creative storytelling instinct every single day.
                </p>
                <p>
                  My long-term ambition is to grow into a premier creative professional and
                  eventually build something much bigger of my own in the global media space.
                </p>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-400">STATUS</p>
                  <p className="text-sm font-semibold text-white">Open to Serious Collaborations</p>
                </div>

                <MagneticButton
                  href="#contact"
                  variant="outline"
                  className="text-xs !py-2 !px-4 gap-1.5"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Mindset Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mindsetPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
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
                    {pillar.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cinema-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
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
