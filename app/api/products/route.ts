import { NextResponse } from "next/server";

import { getMarketplaceProducts } from "@/lib/products";

export async function GET() {
  const items = await getMarketplaceProducts();

  return NextResponse.json({
    items
  });
}
