"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Zap, Target, Sliders, CheckCircle } from "lucide-react";
import { whyWorkWithMeData } from "@/data/whyWorkWithMe";

const reasonIcons = [Zap, ShieldCheck, HeartHandshake, Target, Sliders];

export default function WhyWorkWithMe() {
  return (
    <section id="why-me" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>04 / COLLABORATION VALUES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Work With Me?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
            A grounded, professional creative philosophy built on respect for your time, vision,
            and audience.
          </p>
        </div>

        {/* 5 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyWorkWithMeData.map((item, index) => {
            const Icon = reasonIcons[index % reasonIcons.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-7 rounded-2xl bg-cinema-panel/40 border border-cinema-border hover:border-cinema-accent/40 hover:bg-cinema-panel/70 transition-all duration-300 group flex flex-col justify-between ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-white/10 group-hover:text-cinema-accent/30 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-100 border border-cinema-border flex items-center justify-center text-cinema-accent group-hover:scale-105 group-hover:bg-cinema-accent group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Highlight */}
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cinema-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-cinema-amber mb-3">{item.highlight}</p>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                  <span>Verified Creative Principle</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
