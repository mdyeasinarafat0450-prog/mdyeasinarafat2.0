"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Calendar, CheckCircle2, ArrowUpRight, Film, Info } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import MagneticButton from "./ui/MagneticButton";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Helper to construct YouTube embed if needed
  const getEmbedUrl = () => {
    if (project.embedUrl) return project.embedUrl;
    if (project.videoUrl) {
      if (project.videoUrl.includes("embed")) return project.videoUrl;
      const ytMatch = project.videoUrl.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
      }
      return project.videoUrl;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-cinema-panel border border-cinema-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cinema-border bg-cinema-black/60">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-cinema-accent/15 border border-cinema-accent/30 text-cinema-accent text-xs font-mono font-semibold">
                {project.category}
              </span>
              <span className="text-zinc-500 font-mono text-xs hidden sm:inline-block">
                PROJECT CASE STUDY
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-zinc-400 hover:text-white transition-colors interactive"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Template Notice Banner if placeholder */}
            {project.isPlaceholder && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cinema-amber/10 border border-cinema-amber/30 text-amber-200 text-xs">
                <Info className="w-4 h-4 shrink-0 text-cinema-amber mt-0.5" />
                <p>
                  <strong>Sample Portfolio Entry:</strong> This project is a formatted showcase
                  demonstrating how your client edits, YouTube links, and case studies will display.
                  Easily replace with your real video and description in{" "}
                  <code className="text-white bg-black/40 px-1 py-0.5 rounded font-mono">
                    /data/projects.ts
                  </code>
                  .
                </p>
              </div>
            )}

            {/* Video Player / Preview Area */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-xl">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-cinema-accent/90 text-white flex items-center justify-center shadow-lg mb-3">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                    <p className="text-white font-semibold text-lg">{project.title}</p>
                    <p className="text-zinc-400 text-xs mt-1">Video embed ready in projects.ts</p>
                  </div>
                </div>
              )}
            </div>

            {/* Project Title & Metadata Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cinema-border">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{project.shortDescription}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 shrink-0">
                {project.duration && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cinema-accent" />
                    <span>{project.duration}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cinema-amber" />
                    <span>{project.year}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tools / Focus Tags */}
            {project.tools && project.tools.length > 0 && (
              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                  Techniques & Execution Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-lg bg-surface-100 border border-cinema-border text-xs font-medium text-zinc-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Case Study Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Brief */}
              {project.clientBrief && (
                <div className="p-5 rounded-xl bg-surface-200/50 border border-cinema-border">
                  <h4 className="text-xs font-mono text-cinema-amber uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" />
                    <span>The Objective / Brief</span>
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">{project.clientBrief}</p>
                </div>
              )}

              {/* My Role */}
              {project.myRole && (
                <div className="p-5 rounded-xl bg-surface-200/50 border border-cinema-border">
                  <h4 className="text-xs font-mono text-cinema-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>My Role & Responsibilities</span>
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">{project.myRole}</p>
                </div>
              )}

              {/* Creative Approach */}
              {project.creativeApproach && (
                <div className="p-5 rounded-xl bg-surface-200/50 border border-cinema-border">
                  <h4 className="text-xs font-mono text-cinema-accent uppercase tracking-wider mb-2">
                    Creative & Pacing Approach
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.creativeApproach}
                  </p>
                </div>
              )}

              {/* Final Result */}
              {project.finalResult && (
                <div className="p-5 rounded-xl bg-surface-200/50 border border-cinema-border">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    Final Result & Impact
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">{project.finalResult}</p>
                </div>
              )}
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-6 border-t border-cinema-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-400 text-center sm:text-left">
                Want a video edited with this exact pacing and attention to detail?
              </p>

              <MagneticButton
                href="#contact"
                onClick={onClose}
                variant="primary"
                className="text-xs sm:text-sm !py-2.5 !px-5 gap-1.5 w-full sm:w-auto"
              >
                <span>Discuss Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
