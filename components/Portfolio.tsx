"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Filter, Sparkles, FolderGit2 } from "lucide-react";
import { projectsData, projectCategories, ProjectItem } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-black">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cinema-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
              <Film className="w-3.5 h-3.5" />
              <span>05 / PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Selected Work
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              A curated selection of video editing, motion graphics, and visual storytelling
              projects. Click any project to inspect the case study and video preview.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-cinema-panel/70 border border-cinema-border backdrop-blur-md">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all interactive ${
                  activeCategory === cat
                    ? "bg-cinema-accent text-white shadow-[0_0_15px_rgba(255,51,75,0.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-cinema-border rounded-2xl">
            <FolderGit2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No projects currently under this category.</p>
          </div>
        )}

        {/* Bottom Editing Helper Tip */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-zinc-500">
            SHOWCASING {filteredProjects.length} OF {projectsData.length} PROJECTS • EASY 1-FILE
            CUSTOMIZATION IN <span className="text-zinc-300">/data/projects.ts</span>
          </p>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
