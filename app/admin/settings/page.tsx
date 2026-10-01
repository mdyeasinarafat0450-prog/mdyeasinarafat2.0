"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";

interface SettingsData {
  siteTitle: string;
  siteDescription: string;
  logoText: string;
  logoImage: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  copyright: string;
  maintenanceMode: boolean;
  defaultImage: string;
}

export default function AdminSettings() {
  const [data, setData] = useState<SettingsData>({
    siteTitle: "",
    siteDescription: "",
    logoText: "",
    logoImage: "",
    favicon: "",
    primaryColor: "",
    secondaryColor: "",
    accentColor: "",
    contactEmail: "",
    copyright: "",
    maintenanceMode: false,
    defaultImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((content) => {
        if (content.settings) {
          setData(content.settings);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("Settings updated successfully!");
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
            <h2 className="text-xl font-bold text-white">Site Settings</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your website settings
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
          <h3 className="text-sm font-semibold text-white">General</h3>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Site Title
            </label>
            <input
              type="text"
              value={data.siteTitle}
              onChange={(e) => setData({ ...data, siteTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Site Description
            </label>
            <textarea
              rows={3}
              value={data.siteDescription}
              onChange={(e) =>
                setData({ ...data, siteDescription: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={data.contactEmail}
              onChange={(e) =>
                setData({ ...data, contactEmail: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
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
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Branding</h3>

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

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Default Image URL
            </label>
            <input
              type="text"
              value={data.defaultImage}
              onChange={(e) =>
                setData({ ...data, defaultImage: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Colors</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) =>
                    setData({ ...data, primaryColor: e.target.value })
                  }
                  className="w-10 h-10 rounded-lg border border-cinema-border bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={data.primaryColor}
                  onChange={(e) =>
                    setData({ ...data, primaryColor: e.target.value })
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.secondaryColor}
                  onChange={(e) =>
                    setData({ ...data, secondaryColor: e.target.value })
                  }
                  className="w-10 h-10 rounded-lg border border-cinema-border bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={data.secondaryColor}
                  onChange={(e) =>
                    setData({ ...data, secondaryColor: e.target.value })
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) =>
                    setData({ ...data, accentColor: e.target.value })
                  }
                  className="w-10 h-10 rounded-lg border border-cinema-border bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={data.accentColor}
                  onChange={(e) =>
                    setData({ ...data, accentColor: e.target.value })
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-200 border border-cinema-border text-white text-xs focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white">Maintenance</h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.maintenanceMode}
              onChange={(e) =>
                setData({ ...data, maintenanceMode: e.target.checked })
              }
              className="w-4 h-4 rounded border-cinema-border bg-surface-200 text-cinema-accent focus:ring-cinema-accent"
            />
            <div>
              <span className="text-sm text-zinc-300">Maintenance Mode</span>
              <p className="text-xs text-zinc-600">
                Enable to show a maintenance page to visitors
              </p>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
