import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { createMarketplaceProduct, getMarketplaceProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const source = searchParams.get("source") ?? "all";
  const limit = searchParams.get("limit");

  const items = await getMarketplaceProducts({
    category,
    search,
    source: source === "all" || source === "api" || source === "seed" || source === "database"
      ? source
      : "all",
    limit: limit ? Number(limit) : undefined
  });

  return NextResponse.json({
    items
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await createMarketplaceProduct(body);

    return NextResponse.json(
      {
        product,
        message: "Product saved to the local catalog database."
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid product payload.",
          issues: error.flatten()
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Unable to save product."
      },
      { status: 500 }
    );
  }
}
