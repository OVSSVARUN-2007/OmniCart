import { NextResponse } from "next/server";

import { featuredProducts } from "@/lib/catalog";

export function GET() {
  return NextResponse.json({
    items: featuredProducts
  });
}
