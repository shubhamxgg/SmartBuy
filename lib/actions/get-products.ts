"use server";
import db from "../db";

export async function getProducts() {
  try {
    const products = await db.product.findMany({
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
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}
