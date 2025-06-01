import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(request: Request) {
  try {
    // const productId = parseInt(params.id, 10);
    const productId = 356;
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        seller: {
          include: {
            user: true,
          },
        },
        stock: true,
        images: true,
        reviews: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
