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
