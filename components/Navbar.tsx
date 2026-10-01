"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { useContent } from "@/lib/use-content";

export default function Navbar() {
  const { data, loading } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = data.navItems.filter((item: Record<string, unknown>) => item.visible && !item.isCta);
  const ctaItem = data.navItems.find((item: Record<string, unknown>) => item.isCta && item.visible);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-5 sm:py-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="w-32 h-8 bg-white/[0.04] rounded-lg animate-pulse" />
            <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-cinema-panel/60 border border-white/[0.06]">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-12 h-6 bg-white/[0.04] rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-cinema-black/85 backdrop-blur-xl border-b border-cinema-border shadow-2xl"
            : "py-5 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#hero"
              className="group flex items-center gap-2.5 text-white tracking-tight interactive"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cinema-panel to-surface-100 border border-cinema-border flex items-center justify-center group-hover:border-cinema-accent/60 transition-colors">
                <span className="font-mono text-xs font-bold text-cinema-accent tracking-tighter">
                  {data.settings?.logoText as string || "MYA"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base leading-none text-white tracking-wide group-hover:text-cinema-accent transition-colors">
                  {data.contact?.name as string || "Md Yeasin Arafat"}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  VIDEO & MOTION
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-cinema-panel/60 border border-white/[0.06] backdrop-blur-md">
              {navItems.map((link: Record<string, unknown>) => (
                <a
                  key={link.id as string}
                  href={link.url as string}
                  className="px-3 py-1.5 text-xs lg:text-sm font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all interactive"
                >
                  {link.name as string}
                </a>
              ))}
            </nav>

            {/* Desktop Action Button */}
            {ctaItem && (
              <div className="hidden md:flex items-center gap-3">
                <MagneticButton
                  href={ctaItem.ctaUrl as string}
                  variant="primary"
                  className="text-xs sm:text-sm !py-2.5 !px-5 gap-1.5"
                >
                  <span>{ctaItem.ctaText as string}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-cinema-panel/80 border border-cinema-border text-zinc-300 hover:text-white interactive"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cinema-black/95 backdrop-blur-2xl pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 mb-2">
                Navigation
              </p>
              {navItems.map((link: Record<string, unknown>) => (
                <a
                  key={link.id as string}
                  href={link.url as string}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-zinc-200 hover:text-white hover:bg-white/[0.05] rounded-xl border border-transparent hover:border-cinema-border transition-all flex items-center justify-between"
                >
                  <span>{link.name as string}</span>
                  <span className="text-zinc-600 font-mono text-xs">/</span>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-cinema-border flex flex-col gap-3">
              {ctaItem && (
                <a
                  href={ctaItem.ctaUrl as string}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 text-center font-medium text-white bg-cinema-accent hover:bg-cinema-accentHover rounded-xl shadow-[0_0_20px_rgba(255,51,75,0.4)] flex items-center justify-center gap-2"
                >
                  <span>{ctaItem.ctaText as string}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <p className="text-center font-mono text-xs text-zinc-500 mt-2">
                {data.contact?.name as string} • Video & Motion
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
