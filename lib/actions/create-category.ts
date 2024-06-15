"use server";

import db from "../db";

export const createCategory = async ({ name }: { name: string }) => {
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
};
