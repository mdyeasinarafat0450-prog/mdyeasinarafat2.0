"use client";

import Link from "next/link";
import {
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  ArrowUp,
  Film,
  ExternalLink,
  Code2,
} from "lucide-react";
import { contactConfig } from "@/config/contact";
import { socialProfiles, getActiveSocials, SocialProfile } from "@/config/socials";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Why Me", href: "#why-me" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const activeSocials = getActiveSocials();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-cinema-black border-t border-cinema-border pt-16 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cinema-accent/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="#hero" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cinema-panel to-surface-100 border border-cinema-border flex items-center justify-center group-hover:border-cinema-accent/60 transition-colors">
                <span className="font-mono text-xs font-bold text-cinema-accent tracking-tighter">
                  MYA
                </span>
              </div>
              <span className="font-bold text-lg text-white group-hover:text-cinema-accent transition-colors">
                Md Yeasin Arafat
              </span>
            </Link>

            <p className="text-xs font-mono text-cinema-amber uppercase tracking-wider mb-4">
              Video Editor &amp; Motion Graphics Designer
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              Focused on visual storytelling, high-retention video pacing, and modern motion
              graphics. Ready to collaborate on YouTube, documentary, and brand content.
            </p>

            {/* Direct Email Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 border border-cinema-border text-xs font-mono text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-cinema-accent shrink-0" />
              <span className="truncate">{contactConfig.email}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600 font-mono text-xs">/</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles Requirement 15 */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Connect &amp; Socials
            </h4>

            {activeSocials.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 border border-cinema-border hover:border-cinema-accent text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-all interactive"
                  >
                    <span>{social.name}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-surface-200/60 border border-cinema-border text-xs text-zinc-400 space-y-1 mb-4">
                <p className="font-semibold text-zinc-200">Social Accounts Configuration</p>
                <p>
                  Placeholders for Instagram, Facebook, LinkedIn, YouTube, Behance, and Dribbble are
                  ready. Add your profile links in <code className="text-white">/config/socials.ts</code> to display them.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/[0.04]">
              <p className="text-xs text-zinc-500">
                Location: <span className="text-zinc-300">{contactConfig.location}</span>
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Timezone: <span className="text-zinc-300">{contactConfig.timezone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Scroll to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Md Yeasin Arafat. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-zinc-600">
              CRAFTED WITH PRECISION &amp; KINETIC FLOW
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-surface-100 hover:bg-surface-50 text-zinc-400 hover:text-white border border-cinema-border transition-colors flex items-center gap-1.5 interactive"
              aria-label="Back to top"
            >
              <span className="text-[11px] font-mono">TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
