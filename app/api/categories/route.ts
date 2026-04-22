import { NextResponse } from "next/server";

import { getMarketplaceCategories } from "@/lib/products";

export async function GET() {
  const items = await getMarketplaceCategories();

  return NextResponse.json({
    items
  });
}
