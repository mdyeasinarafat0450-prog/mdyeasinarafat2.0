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
  Copy,
  Star,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  thumbnail: string;
  videoUrl: string;
  embedUrl: string;
  videoType: string;
  duration: string;
  aspectRatio: string;
  year: string;
  featured: boolean;
  visible: boolean;
  clientName: string;
  projectDate: string;
  projectUrl: string;
  clientBrief: string;
  myRole: string;
  creativeApproach: string;
  finalResult: string;
  isPlaceholder: boolean;
  order: number;
  tools: { id: string; name: string; order: number }[];
  images: { id: string; url: string; order: number }[];
  tags: { id: string; name: string }[];
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
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

      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setProjects(projects.map((p) => (p.id === editingId ? saved : p)));
        } else {
          setProjects([...projects, saved]);
        }
        setMessage("Project saved successfully!");
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
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setMessage("Project deleted successfully!");
      } else {
        setMessage("Failed to delete.");
      }
    } catch {
      setMessage("Network error.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDuplicate = async (project: Project) => {
    const duplicate: Partial<Project> = {
      ...project,
      id: undefined,
      title: `${project.title} (Copy)`,
      order: projects.length,
    };
    delete duplicate.id;
    delete duplicate.tools;
    delete duplicate.images;
    delete duplicate.tags;

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicate),
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects([...projects, saved]);
        setMessage("Project duplicated successfully!");
      }
    } catch {
      setMessage("Failed to duplicate.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Video Editing",
      shortDescription: "",
      thumbnail: "",
      videoUrl: "",
      embedUrl: "",
      videoType: "youtube",
      duration: "",
      aspectRatio: "16:9",
      year: "",
      featured: false,
      visible: true,
      clientName: "",
      projectDate: "",
      projectUrl: "",
      clientBrief: "",
      myRole: "",
      creativeApproach: "",
      finalResult: "",
      isPlaceholder: false,
      tools: [],
      images: [],
      tags: [],
    });
    setShowForm(true);
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    try {
      await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, visible: !visible }),
      });
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, visible: !visible } : p))
      );
    } catch {
      setMessage("Failed to update visibility.");
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !featured }),
      });
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, featured: !featured } : p))
      );
    } catch {
      setMessage("Failed to update featured status.");
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
            <h2 className="text-xl font-bold text-white">Projects</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your portfolio projects
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-accent hover:bg-cinema-accentHover text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
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
                {editingId ? "Edit Project" : "New Project"}
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
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={formData.category || "Video Editing"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                >
                  <option value="Video Editing">Video Editing</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Short-form">Short-form</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Short Description
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription || ""}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  value={formData.thumbnail || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Video URL
                </label>
                <input
                  type="text"
                  value={formData.videoUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Aspect Ratio
                </label>
                <input
                  type="text"
                  value={formData.aspectRatio || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, aspectRatio: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.clientName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Project URL
                </label>
                <input
                  type="text"
                  value={formData.projectUrl || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, projectUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Tools (comma-separated)
              </label>
              <input
                type="text"
                value={
                  formData.tools
                    ? formData.tools.map((t) => t.name).join(", ")
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tools: e.target.value
                      .split(",")
                      .map((name) => name.trim())
                      .filter((name) => name)
                      .map((name, i) => ({
                        id: `new-${i}`,
                        name,
                        order: i,
                      })),
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={
                  formData.tags
                    ? formData.tags.map((t) => t.name).join(", ")
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value
                      .split(",")
                      .map((name) => name.trim())
                      .filter((name) => name)
                      .map((name) => ({ id: `new-${name}`, name })),
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Client Brief
              </label>
              <textarea
                rows={2}
                value={formData.clientBrief || ""}
                onChange={(e) =>
                  setFormData({ ...formData, clientBrief: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                My Role
              </label>
              <textarea
                rows={2}
                value={formData.myRole || ""}
                onChange={(e) =>
                  setFormData({ ...formData, myRole: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Creative Approach
              </label>
              <textarea
                rows={2}
                value={formData.creativeApproach || ""}
                onChange={(e) =>
                  setFormData({ ...formData, creativeApproach: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Final Result
              </label>
              <textarea
                rows={2}
                value={formData.finalResult || ""}
                onChange={(e) =>
                  setFormData({ ...formData, finalResult: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-cinema-border text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cinema-accent transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-cinema-border bg-surface-200 text-cinema-accent focus:ring-cinema-accent"
                />
                <span className="text-sm text-zinc-300">Featured</span>
              </label>
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
              {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-cinema-panel border border-cinema-border rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {project.title}
                  </h4>
                  {project.featured && (
                    <Star className="w-3.5 h-3.5 text-cinema-amber fill-cinema-amber" />
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-400 text-[10px] font-mono">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-cinema-amber hover:bg-cinema-amber/10 transition-colors"
                  title={project.featured ? "Unfeature" : "Feature"}
                >
                  <Star
                    className={`w-4 h-4 ${
                      project.featured
                        ? "text-cinema-amber fill-cinema-amber"
                        : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => toggleVisibility(project.id, project.visible)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                  title={project.visible ? "Hide" : "Show"}
                >
                  {project.visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDuplicate(project)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEdit(project)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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
