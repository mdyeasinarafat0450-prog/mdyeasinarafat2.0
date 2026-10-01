"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  iconName: string;
  visible: boolean;
  order: number;
}

export default function AdminSocials() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<SocialLink>>({});

  useEffect(() => {
    fetch("/api/admin/socials")
      .then((res) => res.json())
      .then((data) => {
        setSocials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch("/api/admin/socials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setSocials(socials.map((s) => (s.id === editingId ? saved : s)));
        } else {
          setSocials([...socials, saved]);
        }
        setMessage("Social link saved successfully!");
        setShowForm(false);
        setEditingId(null);
        setFormData({});
      } else {
        setMessage("Failed to save. Please try again.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;

    try {
      const res = await fetch(`/api/admin/socials?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSocials(socials.filter((s) => s.id !== id));
        setMessage("Social link deleted successfully!");
      } else {
        setMessage("Failed to delete.");
      }
    } catch {
      setMessage("Network error.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (social: SocialLink) => {
    setEditingId(social.id);
    setFormData(social);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({
      name: "",
      url: "",
      handle: "",
      iconName: "Globe",
      visible: true,
    });
    setShowForm(true);
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    try {
      await fetch("/api/admin/socials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, visible: !visible }),
      });
      setSocials(
        socials.map((s) => (s.id === id ? { ...s, visible: !visible } : s))
      );
    } catch {
      setMessage("Failed to update visibility.");
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Social Links</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your social media profiles
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-accent hover:bg-cinema-accentHover text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Social Link
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

        {/* Form */}
        {showForm && (
          <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                {editingId ? "Edit Social Link" : "New Social Link"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({});
                }}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Icon Name
                </label>
                <input
                  type="text"
                  value={formData.iconName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, iconName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                URL
              </label>
              <input
                type="text"
                value={formData.url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Handle
              </label>
              <input
                type="text"
                value={formData.handle || ""}
                onChange={(e) =>
                  setFormData({ ...formData, handle: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visible !== false}
                  onChange={(e) =>
                    setFormData({ ...formData, visible: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-cinema-border bg-surface-200 text-cinema-accent focus:ring-cinema-accent"
                />
                <span className="text-sm text-zinc-300">Visible</span>
              </label>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-accent hover:bg-cinema-accentHover text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save Social Link"}
            </button>
          </div>
        )}

        {/* Socials List */}
        <div className="space-y-3">
          {socials.map((social) => (
            <div
              key={social.id}
              className="bg-cinema-panel border border-cinema-border rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {social.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-400 text-[10px] font-mono">
                    {social.iconName}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {social.url || "No URL set"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVisibility(social.id, social.visible)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                  title={social.visible ? "Hide" : "Show"}
                >
                  {social.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(social)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(social.id)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
