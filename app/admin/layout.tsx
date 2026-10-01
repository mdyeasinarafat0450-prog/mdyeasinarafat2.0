"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Image,
  FolderOpen,
  Star,
  MessageSquare,
  Share2,
  Phone,
  Navigation,
  PanelBottom,
  Search,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  User,
  Globe,
  Type,
} from "lucide-react";

const LOGIN_PATH = "/admin/login";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Hero", href: "/admin/hero", icon: Sparkles },
  { name: "About", href: "/admin/about", icon: User },
  { name: "Services", href: "/admin/services", icon: FileText },
  { name: "Skills", href: "/admin/skills", icon: Star },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Why Work With Me", href: "/admin/why-me", icon: Type },
  { name: "Navigation", href: "/admin/navigation", icon: Navigation },
  { name: "Contact", href: "/admin/contact", icon: Phone },
  { name: "Footer", href: "/admin/footer", icon: PanelBottom },
  { name: "Social Links", href: "/admin/socials", icon: Share2 },
  { name: "Media Library", href: "/admin/media", icon: Image },
  { name: "SEO", href: "/admin/seo", icon: Search },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // The login page is public and renders its own full-screen shell.
  // It must never sit behind this gate, otherwise it probes the session,
  // gets a 401 and hangs on the "Loading..." state forever.
  const isLoginRoute = pathname === LOGIN_PATH;

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoginRoute) return;

    let active = true;

    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });

        // 401 is a normal "not signed in" answer, not a failure.
        // Stay on the loading shell while the redirect happens.
        if (res.status === 401) {
          if (active) router.replace(LOGIN_PATH);
          return;
        }
        if (!res.ok) {
          if (active) setLoading(false);
          return;
        }

        const data = await res.json();
        if (!active) return;
        setUser(data?.user ?? null);
        setLoading(false);
      } catch {
        // Network hiccup: settle the UI instead of looping redirects.
        if (active) setLoading(false);
      }
    };

    loadSession();

    return () => {
      active = false;
    };
  }, [isLoginRoute, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.replace(LOGIN_PATH);
    router.refresh();
  };

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="animate-pulse text-cinema-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-black flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-cinema-panel border-r border-cinema-border transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-cinema-border">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cinema-accent flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">Admin Panel</span>
                <p className="text-[10px] text-zinc-500">Portfolio CMS</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors group"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-3 border-t border-cinema-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-cinema-accent/20 flex items-center justify-center">
                <span className="text-xs font-bold text-cinema-accent">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name}
                </p>
                <p className="text-[10px] text-zinc-500 truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-cinema-black/80 backdrop-blur-xl border-b border-cinema-border px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-sm font-semibold text-white">
                  Portfolio Admin
                </h1>
                <p className="text-[10px] text-zinc-500">
                  Manage your website content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
