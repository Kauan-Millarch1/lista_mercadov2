import { NextResponse } from "next/server";

import { getCategories } from "@/features/catalog/lib/get-categories";

export async function GET() {
  return NextResponse.json({
    data: getCategories(),
  });
}
