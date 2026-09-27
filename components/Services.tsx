"use client";

import { motion } from "framer-motion";
import {
  Video,
  Sparkles,
  Palette,
  PlaySquare,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";
import MagneticButton from "./ui/MagneticButton";

const iconMap = {
  Video: Video,
  Sparkles: Sparkles,
  Palette: Palette,
  PlaySquare: PlaySquare,
  Smartphone: Smartphone,
};

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>03 / SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              What I Can Do For You
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Specialized visual production services built around audience engagement, narrative
              flow, and meticulous craftsmanship.
            </p>
          </div>

          <MagneticButton
            href="#contact"
            variant="outline"
            className="text-xs sm:text-sm !py-2.5 !px-5 gap-2 self-start md:self-auto"
          >
            <span>Request Custom Scope</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-7 rounded-2xl bg-cinema-panel/60 border border-cinema-border hover:border-cinema-accent/50 hover:bg-cinema-panel/90 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5 shadow-lg ${
                  index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Subtle top-right ambient glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-cinema-accent/[0.04] group-hover:bg-cinema-accent/[0.1] rounded-full blur-2xl transition-all pointer-events-none" />

                <div>
                  {/* Top Bar with Icon & Aspect Ratio Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-100 border border-cinema-border flex items-center justify-center text-cinema-accent group-hover:scale-110 group-hover:bg-cinema-accent group-hover:text-white transition-all shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                      {service.aspectRatio}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-cinema-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-cinema-amber mb-4">
                    {service.tagline}
                  </p>

                  {/* Short Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cinema-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom link to contact */}
                <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs font-medium text-zinc-400 group-hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inquire for this service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cinema-accent" />
                  </a>
                  <span className="font-mono text-[11px] text-zinc-600">0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
