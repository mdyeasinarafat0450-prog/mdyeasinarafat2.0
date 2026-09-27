"use client";

import { motion } from "framer-motion";
import { Play, Clock, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl bg-cinema-panel/60 border border-cinema-border hover:border-cinema-accent/50 overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-xl interactive"
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cinema-black">
        {/* Thumbnail Image */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-panel via-transparent to-black/30 opacity-70 group-hover:opacity-85 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-full bg-cinema-panel/90 border border-white/10 text-white font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
            {project.category}
          </span>

          {project.duration && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-zinc-300 font-mono text-[10px] backdrop-blur-md">
              <Clock className="w-2.5 h-2.5 text-cinema-accent" />
              {project.duration}
            </span>
          )}
        </div>

        {/* Hover Center Play Action Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-cinema-accent text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_0_25px_#FF334B]">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom edge film-strip accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cinema-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Content Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-cinema-accent transition-colors leading-snug">
              {project.title}
            </h3>
            <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-cinema-accent transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {project.shortDescription}
          </p>
        </div>

        {/* Card Footer: Tools & Trigger */}
        <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tools?.slice(0, 2).map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
              >
                {tool}
              </span>
            ))}
          </div>

          <span className="text-[11px] font-mono text-cinema-accent font-medium group-hover:underline">
            View Case Study →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
