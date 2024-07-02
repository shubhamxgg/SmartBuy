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
