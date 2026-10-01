"use client";

import { useState, useEffect } from "react";

interface ContentData {
  settings: Record<string, unknown> | null;
  navItems: Array<Record<string, unknown>>;
  hero: Record<string, unknown> | null;
  about: Record<string, unknown> | null;
  services: Array<Record<string, unknown>>;
  skills: Array<Record<string, unknown>>;
  projects: Array<Record<string, unknown>>;
  testimonials: Array<Record<string, unknown>>;
  socials: Array<Record<string, unknown>>;
  contact: Record<string, unknown> | null;
  footer: Record<string, unknown> | null;
  seo: Record<string, unknown> | null;
  whyItems: Array<Record<string, unknown>>;
  marqueeItems: Array<Record<string, unknown>>;
  cta: Record<string, unknown> | null;
}

export function useContent() {
  const [data, setData] = useState<ContentData>({
    settings: null,
    navItems: [],
    hero: null,
    about: null,
    services: [],
    skills: [],
    projects: [],
    testimonials: [],
    socials: [],
    contact: null,
    footer: null,
    seo: null,
    whyItems: [],
    marqueeItems: [],
    cta: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch content");
        return res.json();
      })
      .then((content) => {
        setData(content);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
