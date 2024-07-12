"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { ProductStatus } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join } from "path";
import { z } from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be 1000 characters or less"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  status: z.nativeEnum(ProductStatus),
  featured: z.boolean(),
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50, "SKU must be 50 characters or less"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity must be non-negative"),
  lowStockThreshold: z
    .number()
    .int("Low stock threshold must be an integer")
    .nonnegative("Low stock threshold must be non-negative"),
});

export async function createProduct(prevState: any, formData: FormData) {
  const validationResult = productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    category: formData.get("category"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
    sku: formData.get("sku"),
    quantity: parseInt(formData.get("quantity") as string),
    lowStockThreshold:
      parseInt(formData.get("lowStockThreshold") as string) || 0,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const validatedData = validationResult.data;

  try {
    const mainImage = formData.get("mainImage") as File;
    if (!mainImage) {
      return { message: "Main image is required" };
    }

    let imageUrl = "";
    const bytes = await mainImage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${mainImage.name}`;
    const path = join(process.cwd(), "public", "uploads", filename);
    await writeFile(path, buffer);
    imageUrl = `/uploads/${filename}`;

    const additionalImageFiles = formData.getAll("additionalImages") as File[];
    const additionalImages: string[] = [];
    for (const file of additionalImageFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const path = join(process.cwd(), "public", "uploads", filename);
      await writeFile(path, buffer);
      additionalImages.push(`/uploads/${filename}`);
    }

    const product = await db.product.create({
      data: {
        title: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        imageUrl,
        categoryId: parseInt(validatedData.category),
        sellerId: 1,
        status: validatedData.status,
        featured: validatedData.featured,
        stock: {
          create: {
            sku: validatedData.sku,
            quantity: validatedData.quantity,
            lowStockThreshold: validatedData.lowStockThreshold,
          },
        },
        images: {
          createMany: {
            data: additionalImages.map((url) => ({ url })),
          },
        },
      },
      include: {
        stock: true,
        images: true,
      },
    });

    revalidatePath("/products");
    redirect("/products");
  } catch (error) {
    console.error("Error creating product:", error);
    return { message: "An error occurred while creating the product" };
  }
}
