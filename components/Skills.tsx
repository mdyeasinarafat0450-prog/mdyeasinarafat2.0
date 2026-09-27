"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import { skillsData, skillCategories, SkillItem } from "@/data/skills";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillsData[0]);

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((item) => item.category === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-black">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cinema-accent/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>02 / CREATIVE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Skills & Creative Focus
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Focusing on storytelling dynamics, visual flow, and audience retention across modern
              editing disciplines.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-cinema-panel/70 border border-cinema-border">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all interactive ${
                  activeCategory === category
                    ? "bg-cinema-accent text-white shadow-[0_0_12px_rgba(255,51,75,0.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group interactive ${
                    isSelected
                      ? "bg-gradient-to-b from-cinema-panel to-surface-100 border-cinema-accent shadow-[0_0_24px_rgba(255,51,75,0.15)] ring-1 ring-cinema-accent/50"
                      : "bg-cinema-panel/40 border-cinema-border hover:border-cinema-borderBright hover:bg-cinema-panel/70"
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`h-1 w-8 rounded-full mb-4 transition-all duration-300 ${
                      isSelected
                        ? "w-16 bg-cinema-accent"
                        : "bg-white/10 group-hover:bg-cinema-amber"
                    }`}
                  />

                  {/* Badge */}
                  <span className="text-[10px] font-mono text-cinema-amber uppercase tracking-wider block mb-1">
                    {skill.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cinema-accent transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "rotate-90 text-cinema-accent"
                          : "text-zinc-600 group-hover:translate-x-1"
                      }`}
                    />
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {skill.shortDescription}
                  </p>

                  {/* Highlight Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/[0.04]">
                    {skill.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Selected Skill Focus Spotlight Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cinema-panel via-surface-100 to-cinema-panel border border-cinema-borderBright/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cinema-accent/15 border border-cinema-accent/30 flex items-center justify-center text-cinema-accent shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-cinema-accent uppercase tracking-wider">
                ACTIVE CREATIVE FOCUS
              </p>
              <h4 className="text-lg font-bold text-white">{selectedSkill.name}</h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                {selectedSkill.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedSkill.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-medium text-zinc-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cinema-accent" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
