import { HomeClient } from "@/components/storefront/home-client";
import { getMarketplaceCategories, getMarketplaceProducts } from "@/lib/products";

type HomePageProps = {
  searchParams?: Promise<{
    search?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const products = await getMarketplaceProducts();
  const categories = await getMarketplaceCategories();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <HomeClient products={products} categories={categories} initialSearch={resolvedSearchParams?.search ?? ""} />;
}
