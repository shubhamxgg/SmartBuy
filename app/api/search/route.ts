export const dynamic = 'force-dynamic';
import {
  SearchParamsSchema,
  safeParseProduct,
} from "@/lib/schemas";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = SearchParamsSchema.parse(Object.fromEntries(searchParams));
    const where: any = {};

    if (params.categoryId) where.categoryId = Number(params.categoryId);
    if (params.sellerId) where.sellerId = Number(params.sellerId);
    if (params.minPrice)
      where.price = { ...where.price, gte: Number(params.minPrice) };
    if (params.maxPrice)
      where.price = { ...where.price, lte: Number(params.maxPrice) };
    if (params.status) where.status = params.status;
    if (params.featured !== undefined) where.featured = params.featured;
    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
      ];
    }

    const sortBy = params.sortBy || "createdAt";
    const sortOrder = params.sortOrder || "desc";
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          seller: true,
          stock: true,
          images: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    const parsedProducts = products
      .map((product) => {
        try {
          const parsedProduct = safeParseProduct(product);
          return {
            ...parsedProduct,
            createdAt: parsedProduct.createdAt
              ? new Date(parsedProduct.createdAt).toISOString()
              : null,
            updatedAt: parsedProduct.updatedAt
              ? new Date(parsedProduct.updatedAt).toISOString()
              : null,
          };
        } catch (error) {
          console.error("Product parsing error:", error);
          return null;
        }
      })
      .filter((product) => product !== null);

    return NextResponse.json({
      products: parsedProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
