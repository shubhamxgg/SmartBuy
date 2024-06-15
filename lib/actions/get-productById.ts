"use server";

import db from "../db";

export async function getProductById(id: number) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
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
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}
