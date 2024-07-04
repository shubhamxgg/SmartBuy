"use server";

import db from "../db";

export async function createCategory({ name }: { name: string }) {
  // if (!name) {
  //   return { error: "Please enter category name!" };
  // }

  try {
    const category = await db.category.create({
      data: {
        name,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while creating the category");
  }
}

export const getCategories = async () => {
    try {
      const categories = await db.category.findMany();
      return categories;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch data");
    }
  };
  

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