/**
 * =======================================================================
 * CENTRALIZED SOCIAL PROFILES CONFIGURATION
 * =======================================================================
 * Paste your real profile links below.
 * Only profiles with valid URLs will be displayed on the website.
 * Placeholders (or empty strings) will automatically be hidden.
 */

export interface SocialProfile {
  id: string;
  name: string;
  url: string; // Add your real profile URL here
  handle?: string;
  iconName: "Instagram" | "Facebook" | "Linkedin" | "Youtube" | "Behance" | "Dribbble" | "Mail";
}

export const socialProfiles: SocialProfile[] = [
  {
    id: "youtube",
    name: "YouTube",
    url: "", // e.g. "https://youtube.com/@yeasinedits"
    handle: "@yeasinedits",
    iconName: "Youtube",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "", // e.g. "https://instagram.com/yeasin.edits"
    handle: "@yeasin.edits",
    iconName: "Instagram",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "", // e.g. "https://linkedin.com/in/md-yeasin-arafat"
    handle: "Md Yeasin Arafat",
    iconName: "Linkedin",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "", // e.g. "https://facebook.com/yeasin.arafat"
    handle: "Yeasin Arafat",
    iconName: "Facebook",
  },
  {
    id: "behance",
    name: "Behance",
    url: "", // e.g. "https://behance.net/yeasinedits"
    handle: "yeasinedits",
    iconName: "Behance",
  },
  {
    id: "dribbble",
    name: "Dribbble",
    url: "", // e.g. "https://dribbble.com/yeasinedits"
    handle: "yeasinedits",
    iconName: "Dribbble",
  },
];

/**
 * Filter to return only active, configured social accounts.
 */
export const getActiveSocials = (): SocialProfile[] => {
  return socialProfiles.filter(
    (item) => item.url && item.url.trim() !== "" && !item.url.includes("[INSERT")
  );
};
