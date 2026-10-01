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

interface NavItem {
  id: string;
  name: string;
  url: string;
  order: number;
  visible: boolean;
  isCta: boolean;
  ctaText: string;
  ctaUrl: string;
}

export default function AdminNavigation() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<NavItem>>({});

  useEffect(() => {
    fetch("/api/admin/navigation")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
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

      const res = await fetch("/api/admin/navigation", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setItems(items.map((i) => (i.id === editingId ? saved : i)));
        } else {
          setItems([...items, saved]);
        }
        setMessage("Navigation item saved successfully!");
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
    if (!confirm("Are you sure you want to delete this navigation item?")) return;

    try {
      const res = await fetch(`/api/admin/navigation?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
        setMessage("Navigation item deleted successfully!");
      } else {
        setMessage("Failed to delete.");
      }
    } catch {
      setMessage("Network error.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (item: NavItem) => {
    setEditingId(item.id);
    setFormData(item);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({
      name: "",
      url: "#",
      visible: true,
      isCta: false,
      ctaText: "",
      ctaUrl: "",
    });
    setShowForm(true);
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    try {
      await fetch("/api/admin/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, visible: !visible }),
      });
      setItems(
        items.map((i) => (i.id === id ? { ...i, visible: !visible } : i))
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
            <h2 className="text-xl font-bold text-white">Navigation</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your website navigation menu
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-accent hover:bg-cinema-accentHover text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
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
                {editingId ? "Edit Navigation Item" : "New Navigation Item"}
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCta || false}
                  onChange={(e) =>
                    setFormData({ ...formData, isCta: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-cinema-border bg-surface-200 text-cinema-accent focus:ring-cinema-accent"
                />
                <span className="text-sm text-zinc-300">Is CTA Button</span>
              </label>
            </div>

            {formData.isCta && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, ctaText: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    CTA URL
                  </label>
                  <input
                    type="text"
                    value={formData.ctaUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, ctaUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                  />
                </div>
              </div>
            )}

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
              {saving ? "Saving..." : "Save Item"}
            </button>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-cinema-panel border border-cinema-border rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {item.name}
                  </h4>
                  {item.isCta && (
                    <span className="px-2 py-0.5 rounded-full bg-cinema-accent/10 border border-cinema-accent/30 text-cinema-accent text-[10px] font-mono">
                      CTA
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {item.url}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleVisibility(item.id, item.visible)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                  title={item.visible ? "Hide" : "Show"}
                >
                  {item.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
