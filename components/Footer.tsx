"use client";

import Link from "next/link";
import {
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { useContent } from "@/lib/use-content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
};

export default function Footer() {
  const { data, loading } = useContent();
  const footer = data.footer;
  const socials = data.socials;
  const contact = data.contact;

  const activeSocials = socials.filter((s: Record<string, unknown>) => s.visible && s.url);
  const footerLinks = (footer?.links as Array<Record<string, unknown>>) || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading || !footer) {
    return (
      <footer className="bg-cinema-black border-t border-cinema-border pt-16 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.06]">
            <div className="md:col-span-5">
              <div className="w-48 h-8 bg-white/[0.04] rounded-lg mb-4 animate-pulse" />
              <div className="w-full h-4 bg-white/[0.04] rounded mb-2 animate-pulse" />
              <div className="w-3/4 h-4 bg-white/[0.04] rounded mb-6 animate-pulse" />
              <div className="w-40 h-8 bg-white/[0.04] rounded-xl animate-pulse" />
            </div>
            <div className="md:col-span-3">
              <div className="w-24 h-4 bg-white/[0.04] rounded mb-4 animate-pulse" />
              <div className="space-y-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-20 h-3 bg-white/[0.04] rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="w-24 h-4 bg-white/[0.04] rounded mb-4 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-20 h-8 bg-white/[0.04] rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

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
                  {footer.logoText as string}
                </span>
              </div>
              <span className="font-bold text-lg text-white group-hover:text-cinema-accent transition-colors">
                {contact?.name as string}
              </span>
            </Link>

            <p className="text-xs font-mono text-cinema-amber uppercase tracking-wider mb-4">
              {footer.tagline as string}
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              {footer.description as string}
            </p>

            {/* Direct Email Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 border border-cinema-border text-xs font-mono text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-cinema-accent shrink-0" />
              <span className="truncate">{contact?.email as string}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link: Record<string, unknown>) => (
                <li key={link.id as string}>
                  <a
                    href={link.url as string}
                    className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600 font-mono text-xs">/</span>
                    <span>{link.name as string}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
              Connect &amp; Socials
            </h4>

            {activeSocials.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeSocials.map((social: Record<string, unknown>) => {
                  const Icon = iconMap[social.iconName as string] || ExternalLink;
                  return (
                    <a
                      key={social.id as string}
                      href={social.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 border border-cinema-border hover:border-cinema-accent text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-all interactive"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{social.name as string}</span>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-surface-200/60 border border-cinema-border text-xs text-zinc-400 space-y-1 mb-4">
                <p className="font-semibold text-zinc-200">Social Accounts Configuration</p>
                <p>
                  Add your profile links in the Admin Panel to display them.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/[0.04]">
              <p className="text-xs text-zinc-500">
                Location: <span className="text-zinc-300">{contact?.location as string}</span>
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Timezone: <span className="text-zinc-300">{contact?.timezone as string}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Scroll to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{footer.copyright as string}</p>

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
