"use server";

import db from "../db";

export async function getProductByCategory({
  categoryName,
}: {
  categoryName: string;
}) {
  try {
    const categories = await db.category.findMany({
      where: {
        name: categoryName,
      },
      include: {
        products: {
          take: 3,
        },
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}
