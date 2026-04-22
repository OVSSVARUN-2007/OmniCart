import { z } from "zod";

import { featuredProducts, marketplaceCategories, type ProductRecord } from "@/lib/catalog";
import { prisma } from "@/lib/postgres";

const fakeStoreSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string().url(),
    rating: z
      .object({
        rate: z.number()
      })
      .optional()
  })
);

const dummyJsonSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      price: z.number(),
      description: z.string(),
      category: z.string(),
      thumbnail: z.string().url(),
      rating: z.number()
    })
  )
});

const fakeStoreCategoriesSchema = z.array(z.string());
const dummyJsonCategoriesSchema = z.union([
  z.array(z.string()),
  z.array(
    z.object({
      slug: z.string().optional(),
      name: z.string().optional(),
      url: z.string().optional()
    })
  )
]);

const productInputSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  image: z.string().url(),
  category: z.string().min(2),
  inventory: z.coerce.number().int().min(0),
  brand: z.string().min(2).default("OmniCart"),
  rating: z.coerce.number().min(0).max(5).default(4.5),
  badge: z.string().min(2).default("Local Catalog"),
  accent: z.string().min(2).default("from-amber-50 via-white to-orange-50")
});

export type ProductFilters = {
  category?: string;
  search?: string;
  source?: ProductRecord["source"] | "all";
  limit?: number;
};

type ProductInput = z.infer<typeof productInputSchema>;

function normalizeRecord(
  input: Omit<ProductRecord, "source"> & { source?: ProductRecord["source"] }
): ProductRecord {
  return {
    ...input,
    source: input.source ?? "seed"
  };
}

function normalizeCategoryName(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function applyFilters(items: ProductRecord[], filters: ProductFilters = {}) {
  const category = filters.category?.trim().toLowerCase();
  const search = filters.search?.trim().toLowerCase();
  const source = filters.source ?? "all";

  let filtered = items.filter((item) => {
    if (source !== "all" && item.source !== source) {
      return false;
    }

    if (category && item.category.toLowerCase() !== category) {
      return false;
    }

    if (!search) {
      return true;
    }

    const haystack = `${item.name} ${item.brand} ${item.category} ${item.description}`.toLowerCase();
    return haystack.includes(search);
  });

  if (filters.limit && filters.limit > 0) {
    filtered = filtered.slice(0, filters.limit);
  }

  return filtered;
}

async function getDatabaseProducts() {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return products.map((product) =>
      normalizeRecord({
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: "OmniCart",
        category: product.category,
        price: Number(product.price),
        rating: 4.6,
        description: product.description,
        image: product.image,
        inventory: product.inventory,
        badge: product.inventory > 20 ? "In Demand" : "Local Catalog",
        accent:
          product.category.toLowerCase() === "electronics"
            ? "from-sky-100 via-white to-cyan-100"
            : "from-amber-50 via-white to-orange-100",
        source: "database"
      })
    );
  } catch {
    return [];
  }
}

async function getExternalProducts() {
  try {
    const [fakeStoreResponse, dummyJsonResponse] = await Promise.all([
      fetch("https://fakestoreapi.com/products?limit=8", {
        next: { revalidate: 3600 }
      }),
      fetch("https://dummyjson.com/products?limit=8&select=title,price,description,category,thumbnail,rating", {
        next: { revalidate: 3600 }
      })
    ]);

    if (!fakeStoreResponse.ok || !dummyJsonResponse.ok) {
      throw new Error("External product APIs unavailable");
    }

    const fakeStoreJson = fakeStoreSchema.parse(await fakeStoreResponse.json());
    const dummyJson = dummyJsonSchema.parse(await dummyJsonResponse.json());

    return [
      ...fakeStoreJson.map((item) =>
        normalizeRecord({
          id: `fs-${item.id}`,
          slug: `fake-store-${item.id}`,
          name: item.title,
          category: normalizeCategoryName(item.category),
          price: item.price,
          rating: item.rating?.rate ?? 4.7,
          description: item.description,
          image: item.image,
          inventory: 50,
          badge: "API Feed",
          brand: "Fake Store",
          accent: "from-amber-100 via-white to-orange-100",
          source: "api"
        })
      ),
      ...dummyJson.products.map((item) =>
        normalizeRecord({
          id: `dj-${item.id}`,
          slug: `dummy-json-${item.id}`,
          name: item.title,
          category: normalizeCategoryName(item.category),
          price: item.price,
          rating: item.rating,
          description: item.description,
          image: item.thumbnail,
          inventory: 35,
          badge: "Trending API",
          brand: "DummyJSON",
          accent: "from-sky-100 via-white to-cyan-100",
          source: "api"
        })
      )
    ];
  } catch {
    return [];
  }
}

async function getExternalCategories() {
  try {
    const [fakeStoreResponse, dummyJsonResponse] = await Promise.all([
      fetch("https://fakestoreapi.com/products/categories", {
        next: { revalidate: 3600 }
      }),
      fetch("https://dummyjson.com/products/categories", {
        next: { revalidate: 3600 }
      })
    ]);

    if (!fakeStoreResponse.ok || !dummyJsonResponse.ok) {
      throw new Error("External category APIs unavailable");
    }

    const fakeStoreCategories = fakeStoreCategoriesSchema.parse(await fakeStoreResponse.json());
    const dummyJsonCategories = dummyJsonCategoriesSchema.parse(await dummyJsonResponse.json());

    const normalizedDummyJsonCategories = dummyJsonCategories.map((entry) =>
      typeof entry === "string" ? entry : entry.name ?? entry.slug ?? ""
    );

    return [...fakeStoreCategories, ...normalizedDummyJsonCategories]
      .filter(Boolean)
      .map(normalizeCategoryName);
  } catch {
    return [];
  }
}

export async function getMarketplaceProducts(filters: ProductFilters = {}): Promise<ProductRecord[]> {
  const databaseProducts = await getDatabaseProducts();

  if (databaseProducts.length > 0) {
    return applyFilters(databaseProducts, filters);
  }

  const externalProducts = await getExternalProducts();
  const sourceProducts = externalProducts.length > 0 ? externalProducts : featuredProducts;

  return applyFilters(sourceProducts, filters);
}

export async function getMarketplaceCategories() {
  const databaseProducts = await getDatabaseProducts();
  const categorySource =
    databaseProducts.length > 0
      ? databaseProducts.map((product) => product.category)
      : await getExternalCategories();
  const categorySet = new Set([...marketplaceCategories, ...categorySource]);

  return Array.from(categorySet).sort((left, right) => left.localeCompare(right));
}

export async function createMarketplaceProduct(input: unknown) {
  const payload: ProductInput = productInputSchema.parse(input);

  const product = await prisma.product.upsert({
    where: {
      slug: payload.slug
    },
    update: {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      category: payload.category,
      inventory: payload.inventory,
      isActive: true
    },
    create: {
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      category: payload.category,
      inventory: payload.inventory,
      isActive: true
    }
  });

  return normalizeRecord({
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: payload.brand,
    category: product.category,
    price: Number(product.price),
    rating: payload.rating,
    description: product.description,
    image: product.image,
    inventory: product.inventory,
    badge: payload.badge,
    accent: payload.accent,
    source: "database"
  });
}
