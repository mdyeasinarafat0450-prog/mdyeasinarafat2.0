"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";

interface HeroData {
  badgeText: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  heroImage: string;
  heroVideo: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
}

export default function AdminHero() {
  const [data, setData] = useState<HeroData>({
    badgeText: "",
    title: "",
    subtitle: "",
    description: "",
    ctaText: "",
    ctaUrl: "",
    secondaryCtaText: "",
    secondaryCtaUrl: "",
    heroImage: "",
    heroVideo: "",
    stat1Label: "",
    stat1Value: "",
    stat2Label: "",
    stat2Value: "",
    stat3Label: "",
    stat3Value: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((content) => {
        if (content.hero) {
          setData(content.hero);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("Hero section updated successfully!");
      } else {
        setMessage("Failed to update. Please try again.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-cinema-accent">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Hero Section</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your homepage hero content
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-accent hover:bg-cinema-accentHover text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl text-sm ${
              message.includes("success")
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Main Content</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Badge Text
            </label>
            <input
              type="text"
              value={data.badgeText}
              onChange={(e) => setData({ ...data, badgeText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Call-to-Action Buttons</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                value={data.ctaText}
                onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Primary Button URL
              </label>
              <input
                type="text"
                value={data.ctaUrl}
                onChange={(e) => setData({ ...data, ctaUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={data.secondaryCtaText}
                onChange={(e) => setData({ ...data, secondaryCtaText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Secondary Button URL
              </label>
              <input
                type="text"
                value={data.secondaryCtaUrl}
                onChange={(e) => setData({ ...data, secondaryCtaUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Media</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Hero Image URL
            </label>
            <input
              type="text"
              value={data.heroImage}
              onChange={(e) => setData({ ...data, heroImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Hero Video URL (optional)
            </label>
            <input
              type="text"
              value={data.heroVideo}
              onChange={(e) => setData({ ...data, heroVideo: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Statistics</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([1, 2, 3] as const).map((num) => (
              <div key={num} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Stat {num} Label
                  </label>
                  <input
                    type="text"
                    value={data[`stat${num}Label` as keyof HeroData] as string}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [`stat${num}Label`]: e.target.value,
                      } as HeroData)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Stat {num} Value
                  </label>
                  <input
                    type="text"
                    value={data[`stat${num}Value` as keyof HeroData] as string}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [`stat${num}Value`]: e.target.value,
                      } as HeroData)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
