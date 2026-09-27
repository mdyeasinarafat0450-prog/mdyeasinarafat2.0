"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { contactConfig } from "@/config/contact";
import MagneticButton from "./ui/MagneticButton";

const projectTypes = [
  "YouTube Long-form",
  "Short-form (Reels/Shorts)",
  "Motion Graphics",
  "Documentary Edit",
  "Graphic Design / Thumbnails",
  "Other Creative Scope",
];

const budgetRanges = [
  "Under $150",
  "$150 – $300",
  "$300 – $600",
  "$600 – $1,200",
  "$1,200+",
  "Flexible / To Be Discussed",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "YouTube Long-form",
    budget: "$150 – $300",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please write a short description of your project (at least 10 characters).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean submission handling without misleading backend claims
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 700);
  };

  // Pre-filled fallback mailto URL for immediate sending
  const getPreFilledMailto = () => {
    const subject = encodeURIComponent(
      `Project Inquiry: ${formData.projectType} from ${formData.name || "Client"}`
    );
    const body = encodeURIComponent(
      `Hi Yeasin,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n\nProject Details:\n${formData.message}\n\nSent from your portfolio website.`
    );
    const targetEmail =
      contactConfig.email && !contactConfig.email.includes("[INSERT")
        ? contactConfig.email
        : "contact@example.com";
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-cinema-dark/80">
      {/* Background Lighting */}
      <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-cinema-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-panel border border-cinema-border text-xs font-mono text-cinema-accent mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>07 / GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Create Something Great.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mt-2 max-w-2xl">
            Have a project in mind? Let&apos;s turn your idea into something people want to watch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-7 sm:p-8 rounded-2xl bg-cinema-panel/70 border border-cinema-border backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact Channels</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Reach out directly via your preferred platform for quick inquiries, project
                timelines, or sample review.
              </p>

              {/* Centralized Contact Information Items */}
              <div className="space-y-4 mb-8">
                {/* Email Item */}
                <div className="p-4 rounded-xl bg-surface-200/70 border border-cinema-border flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-surface-100 border border-cinema-border flex items-center justify-center text-cinema-accent shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        EMAIL
                      </p>
                      <p className="text-sm font-semibold text-white truncate">
                        {contactConfig.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(contactConfig.email, "email")}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors shrink-0 interactive"
                    title="Copy Email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-xl bg-surface-200/70 border border-cinema-border flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-surface-100 border border-cinema-border flex items-center justify-center text-cinema-amber shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        PHONE / MOBILE
                      </p>
                      <p className="text-sm font-semibold text-white truncate">
                        {contactConfig.phone}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(contactConfig.phone, "phone")}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors shrink-0 interactive"
                    title="Copy Phone"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location & Timezone */}
                <div className="p-4 rounded-xl bg-surface-200/70 border border-cinema-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-100 border border-cinema-border flex items-center justify-center text-zinc-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      LOCATION & TIMEZONE
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {contactConfig.location} • {contactConfig.timezone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirement 14 Contact Action Buttons */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  Quick Connect Actions
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={contactConfig.getEmailHref()}
                    className="p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-cinema-border text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all interactive"
                  >
                    <Mail className="w-4 h-4 text-cinema-accent" />
                    <span>Email Me</span>
                  </a>

                  <a
                    href={contactConfig.getPhoneHref()}
                    className="p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-cinema-border text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all interactive"
                  >
                    <Phone className="w-4 h-4 text-cinema-amber" />
                    <span>Call Me</span>
                  </a>

                  <a
                    href={contactConfig.getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all interactive"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="#contact-form"
                    className="p-3 rounded-xl bg-cinema-accent/15 hover:bg-cinema-accent/25 border border-cinema-accent/30 text-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all interactive"
                  >
                    <Sparkles className="w-4 h-4 text-cinema-accent" />
                    <span>Let&apos;s Work Together</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Centralized config note */}
            <div className="p-4 rounded-xl bg-cinema-panel/40 border border-cinema-border text-xs text-zinc-400">
              <p className="flex items-center gap-1.5 font-mono text-zinc-300 mb-1">
                <Clock className="w-3.5 h-3.5 text-cinema-accent" />
                Response Guarantee
              </p>
              <p>
                Inquiries are typically reviewed within 24 hours. All contact credentials are
                customizable in <code className="text-white">/config/contact.ts</code>.
              </p>
            </div>
          </div>

          {/* Right Column: Professional Contact Form */}
          <div id="contact-form" className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-cinema-panel border border-cinema-border shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-1">Send A Project Inquiry</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Fill in the details below. We will discuss project timelines, creative direction,
                and deliverables.
              </p>

              {/* Form Component */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      Your Name <span className="text-cinema-accent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-surface-200 border ${
                        errors.name ? "border-cinema-accent" : "border-cinema-border"
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cinema-accent focus:ring-1 focus:ring-cinema-accent transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-cinema-accent mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                      Your Email <span className="text-cinema-accent">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex@creatorchannel.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-surface-200 border ${
                        errors.email ? "border-cinema-accent" : "border-cinema-border"
                      } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cinema-accent focus:ring-1 focus:ring-cinema-accent transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-cinema-accent mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-surface-100 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                  >
                    {budgetRanges.map((range) => (
                      <option key={range} value={range} className="bg-surface-100 text-white">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Project Details & Vision <span className="text-cinema-accent">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your video, the pacing you want, links to sample references, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-surface-200 border ${
                      errors.message ? "border-cinema-accent" : "border-cinema-border"
                    } text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cinema-accent focus:ring-1 focus:ring-cinema-accent transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-cinema-accent mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-cinema-accent hover:bg-cinema-accentHover text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,51,75,0.4)] transition-all disabled:opacity-50 interactive"
                >
                  {isSubmitting ? (
                    <span>Validating Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Requirement 24 Modal / Banner for Form Submission */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-cinema-panel/98 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center z-20"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-2">Inquiry Form Validated!</h4>
                    <p className="text-zinc-300 text-sm max-w-md mb-6 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. The
                      frontend form has validated your project data successfully.
                    </p>

                    <div className="p-4 rounded-xl bg-surface-200/90 border border-cinema-border text-left text-xs text-zinc-300 max-w-md mb-6 space-y-2">
                      <div className="flex items-center gap-2 text-cinema-amber font-mono font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ready For Direct Dispatch:</span>
                      </div>
                      <p>
                        To transmit this inquiry directly to Md Yeasin Arafat right now, you can open
                        your email client with all your filled details:
                      </p>
                      <a
                        href={getPreFilledMailto()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cinema-accent text-white rounded-lg font-medium hover:bg-cinema-accentHover transition-colors mt-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open In Email Client With Pre-filled Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      Dismiss / Send Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
