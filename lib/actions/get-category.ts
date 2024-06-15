"use server";

import db from "../db";

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
};
