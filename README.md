# Md Yeasin Arafat — Personal Portfolio Website

A cinematic, modern, high-performance personal portfolio website built for **Md Yeasin Arafat**, a Video Editor & Motion Graphics Designer based in Bangladesh.

Built with a **dark cinematic aesthetic**, fluid motion, timeline-inspired accents, and CMS-style centralized configurations so projects, client feedback, and contact details can be modified in minutes without touching core UI components.

---

## 📽️ Visual & Creative Identity

- **Theme**: Cinematic Near-Black (`#060709`) with crisp white typography, subtle neutral surfaces, and electric film crimson (`#FF334B`) & keyframe amber (`#FF9F1C`) accents.
- **Atmosphere**: Video editor workstation inspired — animated "REC" indicator with live running 24fps timecode, scrub progress playhead bar, timeline tracks simulation, and interactive crosshair cursor.
- **Performance**: Prerendered static pages, zero layout shift, responsive image optimization, and respect for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Motion & Interaction**: Framer Motion
- **Icons**: Lucide React
- **SEO**: Dynamic Metadata, Open Graph, Twitter Cards, Sitemap, and Robots.txt

---

## 📁 Project Structure

```text
/
├── app/
│   ├── globals.css          # Design system, film grain overlay, custom scrollbar
│   ├── layout.tsx           # SEO metadata, Open Graph, custom cursor, scroll progress
│   ├── page.tsx             # Main homepage assembling all portfolio sections
│   ├── robots.ts            # Dynamic robots.txt
│   └── sitemap.ts           # Dynamic sitemap.xml
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx # Smooth cinematic desktop crosshair cursor
│   │   ├── MagneticButton.tsx # Magnetic spring-physics hover buttons
│   │   ├── RecBadge.tsx     # Animated REC status badge with live 24fps timecode
│   │   └── ScrollProgress.tsx # Timeline scrub bar with glowing playhead
│   ├── About.tsx            # "Behind The Edit" story & 4 mindset pillars
│   ├── Contact.tsx          # Centralized contacts & validated inquiry form
│   ├── CTA.tsx              # Large cinematic pre-footer action section
│   ├── Footer.tsx           # Copyright, verified social profiles & quick links
│   ├── Hero.tsx             # Hero headline, badges & simulated timeline monitor
│   ├── MarqueeTicker.tsx    # Continuous ticker highlighting editing disciplines
│   ├── Navbar.tsx           # Sticky compacting navbar with mobile drawer
│   ├── Portfolio.tsx        # "Selected Work" grid with animated category tabs
│   ├── ProjectCard.tsx      # Video project card with hover zoom & play action
│   ├── ProjectDetailModal.tsx # Full case study modal with video embed support
│   ├── Services.tsx         # 5 core services with deliverables & aspect ratios
│   ├── Testimonials.tsx     # Transparent, verified placeholder feedback system
│   └── WhyWorkWithMe.tsx    # 5 grounded collaboration principles
├── config/
│   ├── contact.ts           # ⭐️ Centralized contact details (Email, Phone, WhatsApp)
│   └── socials.ts           # ⭐️ Centralized social profiles (YouTube, Instagram, etc.)
├── data/
│   ├── projects.ts          # ⭐️ CMS-like project dataset (YouTube embeds, case studies)
│   ├── services.ts          # Services descriptions & deliverables
│   ├── skills.ts            # Skills & creative focus categories
│   ├── testimonials.ts      # Client feedback entries
│   └── whyWorkWithMe.ts     # Collaboration values & rationale
├── lib/
│   └── utils.ts             # Tailwind classnames merger helper
├── public/                  # Static assets & icons
├── next.config.mjs          # Next.js image domain configurations
├── package.json             # Scripts & dependencies
├── postcss.config.js        # PostCSS Tailwind setup
├── tailwind.config.ts       # Cinematic colors, animations & font extensions
└── tsconfig.json            # TypeScript configuration
```

---

## ⚡ Quick Start & Setup

### 1. Prerequisites
Ensure **Node.js 18+** or **Node.js 20 LTS** and **npm** are installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create Production Build
```bash
npm run build
npm run start
```

---

## 🎯 How to Customize Your Content

### 1. Updating Contact Information
Open [`config/contact.ts`](file:///e:/web%20and%20app%20deploment/config/contact.ts):
```typescript
export const contactConfig = {
  name: "Md Yeasin Arafat",
  role: "Video Editor & Motion Graphics Designer",
  email: "your.real.email@gmail.com",       // ⬅️ Add your email here
  phone: "+880 17XXXXXXXX",                 // ⬅️ Add your phone number here
  whatsapp: "+88017XXXXXXXX",               // ⬅️ Add your WhatsApp number here
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6 (BST)",
  // ...
};
```
*Note: Any updates here will automatically propagate across the entire website.*

---

### 2. Updating Social Media Links
Open [`config/socials.ts`](file:///e:/web%20and%20app%20deploment/config/socials.ts):
```typescript
export const socialProfiles: SocialProfile[] = [
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@yourchannel", // ⬅️ Add your real URL
    handle: "@yourchannel",
    iconName: "Youtube",
  },
  // Leave empty ("") if you don't use a platform; it will automatically be hidden!
];
```

---

### 3. Adding or Editing Portfolio Projects
Open [`data/projects.ts`](file:///e:/web%20and%20app%20deploment/data/projects.ts).
You can add a new project by appending an object to `projectsData`:
```typescript
{
  id: "my-youtube-video-title",
  title: "My Cinematic Project",
  category: "Video Editing", // "Video Editing" | "Motion Graphics" | "YouTube" | "Short-form" | "Documentary"
  shortDescription: "High-retention edit for a creator with fast-paced storytelling.",
  thumbnail: "https://images.unsplash.com/... or /projects/thumb.jpg",
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  videoType: "youtube",
  duration: "06:15",
  year: "2025",
  featured: true,
  tools: ["Color Grading", "Sound Design"],
  clientBrief: "Client wanted a fast, engaging 6-minute video...",
  myRole: "Lead Video Editor & Sound Designer",
  creativeApproach: "Used L-cuts and dynamic sound effects...",
  finalResult: "Exceeded 70% average view duration.",
}
```

---

### 4. Adding Client Testimonials
Open [`data/testimonials.ts`](file:///e:/web%20and%20app%20deploment/data/testimonials.ts):
Replace the labeled placeholder entries with real testimonials from creators and clients you collaborate with.

---

## 🚀 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio build"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New"** > **"Project"**.
3. Select your GitHub repository.
4. Next.js is automatically detected — click **"Deploy"**.
5. Your portfolio is live with free global CDN and HTTPS!

### Deploy to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish directory: `.next`
4. Click **Deploy**.

---

## 📬 Connecting Form Submissions to an Email Service

The contact form is already completely validated on the frontend and includes a built-in pre-filled mailto fallback.

To connect an automated backend API (e.g., [Formspree](https://formspree.io) or [Resend](https://resend.com)):
1. **Formspree**: Create a free form at Formspree, copy your Form ID, and replace the form submission handler in [`components/Contact.tsx`](file:///e:/web%20and%20app%20deploment/components/Contact.tsx) with a `fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: JSON.stringify(formData) })`.
2. **Resend / Next.js API**: Create `/app/api/contact/route.ts` with `resend.emails.send(...)` and pass an API key via `.env.local`.

---

© 2026 Md Yeasin Arafat. All rights reserved.
