import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error);
    throw new Error("Failed to fetch category");
  }
}

export async function getProductByCategory({
  categoryName,
}: {
  categoryName: string;
}) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: categoryName,
      },
      include: {
        products: {
          take: 4,
        },
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}
