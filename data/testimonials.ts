/**
 * =======================================================================
 * CLIENT TESTIMONIALS DATA
 * =======================================================================
 * Add real client testimonials here as you receive feedback.
 * Currently initialized with labeled placeholder structures so no fake
 * reviews or fabricated client names are ever presented.
 */

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  projectType: string;
  quote: string;
  isPlaceholder?: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-placeholder-1",
    clientName: "Client Feedback Slot #1",
    clientRole: "YouTube Creator / Channel Producer",
    projectType: "Long-form YouTube Editing",
    quote:
      "Client testimonial will be added here once provided. This space is reserved for genuine client feedback regarding pacing, retention, and workflow satisfaction.",
    isPlaceholder: true,
  },
  {
    id: "testimonial-placeholder-2",
    clientName: "Client Feedback Slot #2",
    clientRole: "Brand Director / Content Lead",
    projectType: "Motion Graphics & Social Ads",
    quote:
      "Client testimonial will be added here once provided. This card is ready to showcase client impressions on speed of delivery, visual polish, and motion design quality.",
    isPlaceholder: true,
  },
  {
    id: "testimonial-placeholder-3",
    clientName: "Client Feedback Slot #3",
    clientRole: "Documentary Filmmaker / Creator",
    projectType: "Documentary Visual Storytelling",
    quote:
      "Client testimonial will be added here once provided. Genuine words from collaborators on creative storytelling and visual narrative collaboration.",
    isPlaceholder: true,
  },
];
