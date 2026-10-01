"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, Info, UserCheck } from "lucide-react";
import { useContent } from "@/lib/use-content";

export default function Testimonials() {
  const { data, loading } = useContent();
  const testimonials = data.testimonials;

  if (loading) {
    return (
      <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-dark/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-24 h-6 bg-white/[0.04] rounded-full mb-4 animate-pulse" />
            <div className="w-64 h-10 bg-white/[0.04] rounded-xl mb-2 animate-pulse" />
            <div className="w-96 h-4 bg-white/[0.04] rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full h-48 bg-white/[0.04] rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-dark/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>06 / REVIEWS & FEEDBACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What Clients Say
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
            Reserved exclusively for authentic client feedback. Never padded with fabricated
            testimonials or misleading ratings.
          </p>
        </div>

        {/* Informative Honest Notice Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-cinema-panel border border-cinema-border flex items-start gap-3.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-cinema-accent shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Genuine Collaboration Policy: </span>
            <span>
              Real client quotes and channel reviews will be showcased below as client feedback is
              received.
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item: Record<string, unknown>, index: number) => (
            <motion.div
              key={item.id as string}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-7 rounded-2xl bg-cinema-panel/40 border border-cinema-border relative overflow-hidden flex flex-col justify-between group hover:border-cinema-accent/30 transition-all duration-300"
            >
              {/* Quotation Watermark */}
              <MessageSquareQuote className="w-16 h-16 text-white/[0.03] absolute -bottom-2 -right-2 pointer-events-none" />

              <div>
                {/* Header with Slot Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-cinema-amber px-2.5 py-1 rounded-full bg-cinema-amber/10 border border-cinema-amber/20 uppercase tracking-wider">
                    {item.isPlaceholder ? "Verified Slot" : "Client Feedback"}
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">#0{index + 1}</span>
                </div>

                {/* Quote Text */}
                <p className="text-zinc-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{item.quote as string}&rdquo;
                </p>
              </div>

              {/* Client Info Placeholder */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-100 border border-cinema-border flex items-center justify-center text-zinc-400 group-hover:text-cinema-accent transition-colors">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {item.clientName as string}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    {item.clientRole as string}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
