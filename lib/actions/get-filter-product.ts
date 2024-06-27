"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient, Prisma } from "@prisma/client";

const db = new PrismaClient();

export interface FilterParams {
  categoryNames?: string[];
  minPrice?: number;
  maxPrice?: number;
  brand?: string | undefined;
  minRating?: number;
  skip?: number;
  take?: number;
  sort?: string;
}

export async function getFilteredProducts(filters: FilterParams) {
  try {
    const {
      categoryNames,
      minPrice,
      maxPrice,
      brand,
      minRating,
      skip,
      take = 10,
      sort,
    } = filters;

    let orderBy: Prisma.ProductOrderByWithRelationInput = {};

    switch (sort) {
      case "priceLowToHigh":
        orderBy = { price: "asc" };
        break;
      case "priceHighToLow":
        orderBy = { price: "desc" };
        break;
      case "featured":
        orderBy = { featured: "desc" };
        break;
      default:
        orderBy = { featured: "desc" };
    }

    const filterConditions: Prisma.ProductWhereInput = {};

    if (categoryNames && categoryNames.length > 0) {
      filterConditions.category = {
        name: {
          in: categoryNames,
        },
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filterConditions.price = {};
      if (minPrice !== undefined) filterConditions.price.gte = minPrice;
      if (maxPrice !== undefined) filterConditions.price.lte = maxPrice;
    }

    if (minRating !== undefined) {
      filterConditions.reviews = {
        some: {
          rating: {
            gte: minRating,
          },
        },
      };
    }

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
      orderBy,
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
