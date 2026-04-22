export type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  inventory: number;
  accent: string;
  badge: string;
  source: "seed" | "api" | "database";
};

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
};

export const marketplaceCategories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Appliances",
  "Mobiles",
  "Groceries",
  "Travel"
];

export const trustSignals = [
  { label: "Orders processed", value: "1.8M+" },
  { label: "Enterprise merchants", value: "420+" },
  { label: "Avg. checkout latency", value: "190ms" },
  { label: "Identity coverage", value: "Google + Microsoft" }
];

export const discoveryLanes = [
  {
    title: "Top deals",
    summary: "High-velocity offers inspired by large marketplace merchandising."
  },
  {
    title: "Fashion edits",
    summary: "Editorial category grouping with stronger brand-first storytelling."
  },
  {
    title: "Smart devices",
    summary: "High-value electronics surfaced with conversion-oriented cards."
  }
];

export const featuredProducts: ProductRecord[] = [
  {
    id: "seed-headphones",
    slug: "pulse-x1-headphones",
    name: "Pulse X1 Headphones",
    brand: "Omni Audio",
    category: "Electronics",
    price: 299,
    rating: 4.9,
    description: "Spatial audio headset with adaptive noise control and premium travel comfort.",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    inventory: 18,
    accent: "from-orange-50 via-white to-rose-50",
    badge: "Best Seller",
    source: "seed"
  },
  {
    id: "seed-bag",
    slug: "metro-leather-carry",
    name: "Metro Leather Carry",
    brand: "Northline",
    category: "Fashion",
    price: 159,
    rating: 4.7,
    description: "Structured day-to-night carry bag designed for professionals on the move.",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    inventory: 11,
    accent: "from-amber-50 via-white to-yellow-50",
    badge: "Premium Pick",
    source: "seed"
  },
  {
    id: "seed-jacket",
    slug: "flex-motion-jacket",
    name: "Flex Motion Jacket",
    brand: "Urban Axis",
    category: "Fashion",
    price: 119,
    rating: 4.6,
    description: "Lightweight outerwear with a tailored fit and marketplace-friendly positioning.",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    inventory: 24,
    accent: "from-slate-100 via-white to-zinc-100",
    badge: "Trending",
    source: "seed"
  },
  {
    id: "seed-monitor",
    slug: "visionhub-display",
    name: "VisionHub Display",
    brand: "GlassDock",
    category: "Electronics",
    price: 429,
    rating: 4.8,
    description: "Ultra-clean productivity display for command centers and design desks.",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    inventory: 9,
    accent: "from-sky-50 via-white to-cyan-50",
    badge: "Editor's Pick",
    source: "seed"
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Gross merchandise value", value: "$2.48M", change: "+18.4% month over month" },
  { label: "Authenticated customers", value: "84.3K", change: "+11.2% verified identity growth" },
  { label: "Checkout success rate", value: "98.9%", change: "+0.7% after session hardening" },
  { label: "Catalog ingestion", value: "API + DB", change: "Hybrid feed with fallback resilience" }
];

export const dashboardActivities = [
  "OAuth-only identity path prepared for Google and Microsoft sign-in.",
  "PostgreSQL schema added for users, accounts, products, and orders.",
  "MongoDB audit-log layer added for event and activity retention.",
  "Security middleware ships baseline headers and CSP policy.",
  "Marketplace catalog can hydrate from product APIs with local fallback."
];

export const securityPillars = [
  {
    title: "OAuth-first identity",
    detail: "Google and Microsoft providers handle end-user login while Auth.js manages secure callbacks and JWT sessions."
  },
  {
    title: "Hybrid persistence",
    detail: "PostgreSQL is prepared for transactional commerce data; MongoDB is prepared for event-oriented logs and operational telemetry."
  },
  {
    title: "Secure-by-default headers",
    detail: "Content Security Policy, frame denial, strict referrer handling, and content sniffing protections are added at the middleware layer."
  }
];
