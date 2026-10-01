"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  favicon: string;
}

export default function AdminSEO() {
  const [data, setData] = useState<SEOData>({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
    favicon: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((content) => {
        if (content.seo) {
          setData(content.seo);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("SEO settings updated successfully!");
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
            <h2 className="text-xl font-bold text-white">SEO Settings</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your website SEO and metadata
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
          <h3 className="text-sm font-semibold text-white">Meta Tags</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={data.metaTitle}
              onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
            <p className="text-[10px] text-zinc-600 mt-1">
              Recommended: 50-60 characters
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={data.metaDescription}
              onChange={(e) =>
                setData({ ...data, metaDescription: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
            <p className="text-[10px] text-zinc-600 mt-1">
              Recommended: 150-160 characters
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Keywords
            </label>
            <input
              type="text"
              value={data.keywords}
              onChange={(e) => setData({ ...data, keywords: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
            <p className="text-[10px] text-zinc-600 mt-1">
              Separate keywords with commas
            </p>
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Open Graph</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              OG Title
            </label>
            <input
              type="text"
              value={data.ogTitle}
              onChange={(e) => setData({ ...data, ogTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              OG Description
            </label>
            <textarea
              rows={3}
              value={data.ogDescription}
              onChange={(e) =>
                setData({ ...data, ogDescription: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              OG Image URL
            </label>
            <input
              type="text"
              value={data.ogImage}
              onChange={(e) => setData({ ...data, ogImage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
            <p className="text-[10px] text-zinc-600 mt-1">
              Recommended: 1200x630 pixels
            </p>
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Other Settings</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Canonical URL
            </label>
            <input
              type="text"
              value={data.canonicalUrl}
              onChange={(e) => setData({ ...data, canonicalUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Favicon URL
            </label>
            <input
              type="text"
              value={data.favicon}
              onChange={(e) => setData({ ...data, favicon: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
}
