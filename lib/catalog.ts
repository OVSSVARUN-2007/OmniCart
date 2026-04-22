export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  accent: string;
  badge: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
};

export const heroStats = [
  { label: "Global shoppers reached", value: "2.4M+" },
  { label: "Fulfillment partners", value: "180+" },
  { label: "Average NPS uplift", value: "32%" }
];

export const categories = [
  {
    name: "Smart Devices",
    summary: "Connected products curated for high-conversion launches and premium bundles."
  },
  {
    name: "Workspace Design",
    summary: "Elevated office, desk, and studio essentials tuned for hybrid teams."
  },
  {
    name: "Lifestyle Audio",
    summary: "Immersive listening gear with premium positioning and subscription add-ons."
  }
];

export const featuredProducts: Product[] = [
  {
    id: "pulse-x1",
    name: "Pulse X1 Headphones",
    category: "Lifestyle Audio",
    price: 299,
    rating: 4.9,
    description: "Spatial audio headset with adaptive noise control and all-day comfort tuning.",
    accent: "from-[#ff9966] via-[#ff5e62] to-[#7d2ae8]",
    badge: "Best Seller"
  },
  {
    id: "glass-dock",
    name: "GlassDock Pro",
    category: "Workspace Design",
    price: 189,
    rating: 4.8,
    description: "Architectural charging dock crafted for multi-device desks and studio setups.",
    accent: "from-[#74ebd5] via-[#9face6] to-[#4f46e5]",
    badge: "Editor's Pick"
  },
  {
    id: "nova-pad",
    name: "NovaPad Air",
    category: "Smart Devices",
    price: 649,
    rating: 4.7,
    description: "Ultra-light productivity tablet built for design, meetings, and commerce on the move.",
    accent: "from-[#f6d365] via-[#fda085] to-[#f43f5e]",
    badge: "Launch Week"
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Gross revenue", value: "$184.2K", change: "+14.8% vs last month" },
  { label: "Returning users", value: "68%", change: "+9.2% retention lift" },
  { label: "Conversion rate", value: "5.42%", change: "+1.1% optimization gain" }
];

export const dashboardActivities = [
  "Google OAuth sign-ins enabled for consumer identities.",
  "Microsoft account sign-ins enabled for work and school users.",
  "JWT sessions configured for scalable stateless authentication.",
  "Demo merchandising feed seeded for storefront previews.",
  "Executive dashboard callout added to distinguish demo and production use."
];

export const testimonials = [
  {
    quote: "OmniCart feels like the kind of commerce platform a funded product team would actually ship.",
    author: "Aarav Patel",
    role: "Product Lead, Vertex Retail"
  },
  {
    quote: "The UI quality, information hierarchy, and dashboard polish make it presentation-ready.",
    author: "Maya Johnson",
    role: "Design Director, Northline Studio"
  }
];
