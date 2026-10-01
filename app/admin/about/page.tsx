"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

interface Pillar {
  id?: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

interface AboutData {
  title: string;
  description: string;
  shortBio: string;
  longBio: string;
  profileImage: string;
  experience: string;
  education: string;
  ctaText: string;
  ctaUrl: string;
  statusText: string;
  pillars: Pillar[];
}

export default function AdminAbout() {
  const [data, setData] = useState<AboutData>({
    title: "",
    description: "",
    shortBio: "",
    longBio: "",
    profileImage: "",
    experience: "",
    education: "",
    ctaText: "",
    ctaUrl: "",
    statusText: "",
    pillars: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((content) => {
        if (content.about) {
          setData({
            ...content.about,
            pillars: content.about.pillars || [],
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("About section updated successfully!");
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

  const addPillar = () => {
    setData({
      ...data,
      pillars: [
        ...data.pillars,
        { icon: "Lightbulb", title: "", subtitle: "", description: "" },
      ],
    });
  };

  const removePillar = (index: number) => {
    setData({
      ...data,
      pillars: data.pillars.filter((_, i) => i !== index),
    });
  };

  const updatePillar = (index: number, field: keyof Pillar, value: string) => {
    const newPillars = [...data.pillars];
    newPillars[index] = { ...newPillars[index], [field]: value };
    setData({ ...data, pillars: newPillars });
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
            <h2 className="text-xl font-bold text-white">About Section</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your about page content
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
              Description
            </label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Short Bio
            </label>
            <textarea
              rows={2}
              value={data.shortBio}
              onChange={(e) => setData({ ...data, shortBio: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Long Bio
            </label>
            <textarea
              rows={4}
              value={data.longBio}
              onChange={(e) => setData({ ...data, longBio: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Profile & Details</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              value={data.profileImage}
              onChange={(e) => setData({ ...data, profileImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Experience
              </label>
              <input
                type="text"
                value={data.experience}
                onChange={(e) => setData({ ...data, experience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Education
              </label>
              <input
                type="text"
                value={data.education}
                onChange={(e) => setData({ ...data, education: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Status Text
            </label>
            <input
              type="text"
              value={data.statusText}
              onChange={(e) => setData({ ...data, statusText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                CTA Text
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
                CTA URL
              </label>
              <input
                type="text"
                value={data.ctaUrl}
                onChange={(e) => setData({ ...data, ctaUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Mindset Pillars</h3>
            <button
              onClick={addPillar}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cinema-accent/10 border border-cinema-accent/30 text-cinema-accent text-xs font-medium hover:bg-cinema-accent/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Pillar
            </button>
          </div>

          {data.pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-surface-200/50 border border-cinema-border space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  Pillar {index + 1}
                </span>
                <button
                  onClick={() => removePillar(index)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={pillar.icon}
                  onChange={(e) => updatePillar(index, "icon", e.target.value)}
                  placeholder="Icon name"
                  className="px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
                <input
                  type="text"
                  value={pillar.title}
                  onChange={(e) => updatePillar(index, "title", e.target.value)}
                  placeholder="Title"
                  className="px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <input
                type="text"
                value={pillar.subtitle}
                onChange={(e) => updatePillar(index, "subtitle", e.target.value)}
                placeholder="Subtitle"
                className="w-full px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cinema-accent transition-colors"
              />
              <textarea
                rows={2}
                value={pillar.description}
                onChange={(e) => updatePillar(index, "description", e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cinema-accent transition-colors resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
