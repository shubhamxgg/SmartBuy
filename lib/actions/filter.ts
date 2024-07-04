"use server";

import db from "../db";

export async function getFeaturedItem() {
  try {
    const products = await db.product.findMany({
      where: {
        featured: true,
      },
      include: {
        images: true,
      },
      take: 4,
    });
    return products;
  } catch (error) {
    console.error("Error fetching featured items:", error);
    throw new Error("Unable to fetch featured items");
  }
}

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

