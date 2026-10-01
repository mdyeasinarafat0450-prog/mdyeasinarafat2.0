"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

interface FooterLink {
  id: string;
  name: string;
  url: string;
  order: number;
}

interface FooterData {
  description: string;
  copyright: string;
  logoText: string;
  logoImage: string;
  tagline: string;
  links: FooterLink[];
}

export default function AdminFooter() {
  const [data, setData] = useState<FooterData>({
    description: "",
    copyright: "",
    logoText: "",
    logoImage: "",
    tagline: "",
    links: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((content) => {
        if (content.footer) {
          setData({
            ...content.footer,
            links: content.footer.links || [],
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
      const res = await fetch("/api/admin/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("Footer updated successfully!");
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

  const addLink = () => {
    setData({
      ...data,
      links: [
        ...data.links,
        { id: `new-${Date.now()}`, name: "", url: "", order: data.links.length },
      ],
    });
  };

  const removeLink = (index: number) => {
    setData({
      ...data,
      links: data.links.filter((_, i) => i !== index),
    });
  };

  const updateLink = (index: number, field: "name" | "url", value: string) => {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData({ ...data, links: newLinks });
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
            <h2 className="text-xl font-bold text-white">Footer</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your website footer
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
              Copyright
            </label>
            <input
              type="text"
              value={data.copyright}
              onChange={(e) => setData({ ...data, copyright: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Logo</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Logo Text
              </label>
              <input
                type="text"
                value={data.logoText}
                onChange={(e) => setData({ ...data, logoText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Logo Image URL
              </label>
              <input
                type="text"
                value={data.logoImage}
                onChange={(e) => setData({ ...data, logoImage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Footer Links</h3>
            <button
              onClick={addLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cinema-accent/10 border border-cinema-accent/30 text-cinema-accent text-xs font-medium hover:bg-cinema-accent/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Link
            </button>
          </div>

          {data.links.map((link, index) => (
            <div
              key={link.id}
              className="p-4 rounded-xl bg-surface-200/50 border border-cinema-border space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  Link {index + 1}
                </span>
                <button
                  onClick={() => removeLink(index)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateLink(index, "name", e.target.value)}
                  placeholder="Name"
                  className="px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  placeholder="URL"
                  className="px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
