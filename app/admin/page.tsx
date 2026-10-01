"use client";

import { useEffect, useState } from "react";
import {
  FolderOpen,
  FileText,
  MessageSquare,
  Image,
  Star,
  Eye,
  TrendingUp,
} from "lucide-react";

interface DashboardStats {
  projects: number;
  services: number;
  skills: number;
  testimonials: number;
  media: number;
  socials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    services: 0,
    skills: 0,
    testimonials: 0,
    media: 0,
    socials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          projects: data.projects?.length || 0,
          services: data.services?.length || 0,
          skills: data.skills?.length || 0,
          testimonials: data.testimonials?.length || 0,
          media: data.media?.length || 0,
          socials: data.socials?.length || 0,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { name: "Projects", value: stats.projects, icon: FolderOpen, color: "text-cinema-accent" },
    { name: "Services", value: stats.services, icon: FileText, color: "text-cinema-amber" },
    { name: "Skills", value: stats.skills, icon: Star, color: "text-cinema-cyan" },
    { name: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "text-emerald-400" },
    { name: "Media Files", value: stats.media, icon: Image, color: "text-purple-400" },
    { name: "Social Links", value: stats.socials, icon: Eye, color: "text-pink-400" },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Overview of your portfolio content
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-cinema-panel border border-cinema-border rounded-xl p-4 animate-pulse"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] mb-3" />
                <div className="h-6 w-12 bg-white/[0.04] rounded mb-1" />
                <div className="h-3 w-16 bg-white/[0.04] rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.name}
                  className="bg-cinema-panel border border-cinema-border rounded-xl p-4 hover:border-cinema-accent/30 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{stat.name}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-cinema-panel border border-cinema-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cinema-accent" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <a
              href="/admin/projects"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-cinema-border hover:border-cinema-accent/30 transition-all"
            >
              <FolderOpen className="w-4 h-4 text-cinema-accent" />
              <span className="text-sm text-zinc-300">Manage Projects</span>
            </a>
            <a
              href="/admin/services"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-cinema-border hover:border-cinema-accent/30 transition-all"
            >
              <FileText className="w-4 h-4 text-cinema-amber" />
              <span className="text-sm text-zinc-300">Edit Services</span>
            </a>
            <a
              href="/admin/hero"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-cinema-border hover:border-cinema-accent/30 transition-all"
            >
              <Eye className="w-4 h-4 text-cinema-cyan" />
              <span className="text-sm text-zinc-300">Update Hero</span>
            </a>
            <a
              href="/admin/media"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-cinema-border hover:border-cinema-accent/30 transition-all"
            >
              <Image className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-300">Media Library</span>
            </a>
            <a
              href="/admin/seo"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-cinema-border hover:border-cinema-accent/30 transition-all"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-300">SEO Settings</span>
            </a>
            <a
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-cinema-border hover:border-cinema-accent/30 transition-all"
            >
              <Star className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-zinc-300">Site Settings</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
