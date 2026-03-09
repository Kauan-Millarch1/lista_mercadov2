import { NextResponse } from "next/server";

import { getProducts } from "@/features/catalog/lib/get-products";

export async function GET(request: Request) {
  const categorySlug = new URL(request.url).searchParams.get("category");

  return NextResponse.json({
    data: getProducts({ categorySlug }),
  });
}
