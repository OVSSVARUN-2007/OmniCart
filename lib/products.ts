import { z } from "zod";

import { featuredProducts, marketplaceCategories, type ProductRecord } from "@/lib/catalog";

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

function normalizeRecord(
  input: Omit<ProductRecord, "source"> & { source?: ProductRecord["source"] }
): ProductRecord {
  return {
    ...input,
    source: input.source ?? "seed"
  };
}

export async function getMarketplaceProducts(): Promise<ProductRecord[]> {
  try {
    const [fakeStoreResponse, dummyJsonResponse] = await Promise.all([
      fetch("https://fakestoreapi.com/products?limit=4", {
        next: { revalidate: 3600 }
      }),
      fetch("https://dummyjson.com/products?limit=4&select=title,price,description,category,thumbnail,rating", {
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
          name: item.title,
          category: item.category,
          price: item.price,
          rating: item.rating?.rate ?? 4.7,
          description: item.description,
          image: item.image,
          badge: "API Feed",
          brand: "Fake Store",
          accent: "from-amber-100 via-white to-orange-100",
          source: "api"
        })
      ),
      ...dummyJson.products.map((item) =>
        normalizeRecord({
          id: `dj-${item.id}`,
          name: item.title,
          category: item.category,
          price: item.price,
          rating: item.rating,
          description: item.description,
          image: item.thumbnail,
          badge: "Trending API",
          brand: "DummyJSON",
          accent: "from-sky-100 via-white to-cyan-100",
          source: "api"
        })
      )
    ];
  } catch {
    return featuredProducts;
  }
}

export function getMarketplaceCategories() {
  return marketplaceCategories;
}
