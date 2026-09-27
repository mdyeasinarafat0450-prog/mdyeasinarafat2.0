import type { Metadata, Viewport } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const viewport: Viewport = {
  themeColor: "#060709",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Md Yeasin Arafat — Video Editor & Motion Graphics Designer",
  description:
    "Portfolio of Md Yeasin Arafat, a video editor and motion graphics enthusiast creating engaging, modern and visually compelling content.",
  keywords: [
    "Md Yeasin Arafat",
    "Video Editor",
    "Motion Graphics Designer",
    "YouTube Video Editing",
    "Short-form Content",
    "Reels Editor",
    "Cinematic Documentary Editor",
    "Visual Storytelling",
    "Creative Director Bangladesh",
  ],
  authors: [{ name: "Md Yeasin Arafat" }],
  creator: "Md Yeasin Arafat",
  metadataBase: new URL("https://mdyeasinarafat.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdyeasinarafat.com",
    title: "Md Yeasin Arafat — Video Editor & Motion Graphics Designer",
    description:
      "Portfolio of Md Yeasin Arafat, a video editor and motion graphics enthusiast creating engaging, modern and visually compelling content.",
    siteName: "Md Yeasin Arafat Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Md Yeasin Arafat — Video Editor & Motion Graphics Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Yeasin Arafat — Video Editor & Motion Graphics Designer",
    description:
      "Portfolio of Md Yeasin Arafat, a video editor and motion graphics enthusiast creating engaging, modern and visually compelling content.",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-cinema-black text-zinc-100 antialiased selection:bg-cinema-accent selection:text-white">
        {/* Subtle Film Grain Texture Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Cinematic Scroll Playhead */}
        <ScrollProgress />

        {/* Custom Desktop Interactive Crosshair Cursor */}
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
