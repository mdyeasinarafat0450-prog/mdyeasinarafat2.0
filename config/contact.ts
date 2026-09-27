/**
 * =======================================================================
 * CENTRALIZED CONTACT CONFIGURATION
 * =======================================================================
 * All contact information is managed in this single file.
 * Update your real details here and they will automatically reflect across
 * the entire website (Navbar, Contact Section, Footer, Direct Action Buttons).
 */

export const contactConfig = {
  name: "Md Yeasin Arafat",
  role: "Video Editor & Motion Graphics Designer",
  status: "Available for Freelance Projects",
  location: "Bangladesh",
  timezone: "GMT+6 (BST)",
  turnaround: "Fast Turnaround & Clear Communication",

  // CONTACT CHANNELS (Replace these placeholders with your real credentials)
  email: "[INSERT_EMAIL_HERE]", // Example: "yeasin.edits@example.com"
  phone: "[INSERT_PHONE_HERE]", // Example: "+880 1XXXXXXXXX"
  whatsapp: "[INSERT_WHATSAPP_HERE]", // Example: "+8801XXXXXXXXX" or "https://wa.me/8801XXXXXXXXX"

  // Quick Action Links helper
  getEmailHref: () => {
    return contactConfig.email && !contactConfig.email.includes("[INSERT")
      ? `mailto:${contactConfig.email}`
      : "#contact";
  },
  getPhoneHref: () => {
    return contactConfig.phone && !contactConfig.phone.includes("[INSERT")
      ? `tel:${contactConfig.phone.replace(/\s+/g, "")}`
      : "#contact";
  },
  getWhatsAppHref: () => {
    const raw = contactConfig.whatsapp;
    if (raw && !raw.includes("[INSERT")) {
      if (raw.startsWith("http")) return raw;
      const cleanNum = raw.replace(/[^\d+]/g, "");
      return `https://wa.me/${cleanNum.replace("+", "")}?text=Hi%20Yeasin,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20video%20project!`;
    }
    return "#contact";
  },
};
