"use server";
import { revalidatePath } from "next/cache";
import db from "../db";

interface FilterParams {
  categoryNames?: string[];
  minPrice?: number;
  maxPrice?: number;
  brand?: string | undefined;
  minRating?: number;
  skip?: number;
  take?: number;
}

export async function getFilteredProducts(filters: FilterParams) {
  try {
    const { categoryNames, minPrice, maxPrice, brand, minRating, skip, take } =
      filters;

    const filterConditions: any = {};

    // Filter by category names
    if (categoryNames && categoryNames.length > 0) {
      filterConditions.category = {
        name: {
          in: categoryNames,
        },
      };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filterConditions.price = {};
      if (minPrice !== undefined) filterConditions.price.gte = minPrice;
      if (maxPrice !== undefined) filterConditions.price.lte = maxPrice;
    }

    // Filter by brand
    if (brand) {
      filterConditions.brand = brand;
    }

    // Filter by minimum rating
    if (minRating) {
      filterConditions.reviews = {
        some: {
          rating: {
            gte: minRating,
          },
        },
      };
    }

    console.log("Filter Conditions: ", filterConditions);
    console.log("Pagination: ", { skip, take });

    const products = await db.product.findMany({
      where: filterConditions,
      skip,
      take,
      include: {
        category: true,
        seller: {
          include: {
            user: true,
          },
        },
        images: true,
        reviews: true,
      },
    });

    const totalProducts = await db.product.count({ where: filterConditions });

    console.log("Products: ", products);
    console.log("Total Products: ", totalProducts);
    return { products, totalProducts };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw new Error("Failed to fetch filtered products");
  }
}
