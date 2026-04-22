import { HomeClient } from "@/components/storefront/home-client";
import { getMarketplaceCategories, getMarketplaceProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getMarketplaceProducts();
  const categories = getMarketplaceCategories();

  return <HomeClient products={products} categories={categories} />;
}
