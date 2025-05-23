"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ProductStatus } from "@prisma/client";
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
    const mainImage = formData.get("mainImage") as string;
    const additionalImages = formData.getAll("additionalImages") as string[];

    const uploadFormData = new FormData();
    uploadFormData.append("files", mainImage);
    additionalImages.forEach((file) => {
      uploadFormData.append("files", file);
    });

    const response = await fetch("http:localhost:3000/api/upload", {
      method: "POST",
      body: uploadFormData,
    });

    const uploadResponse = await response.json();
    console.log("Upload response:", uploadResponse);
    if (!response.ok) {
      throw new Error("Failed to upload main image");
    }

    await db.product.create({
      data: {
        title: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        imageUrl: uploadResponse.url[0].original,
        categoryId: parseInt(validatedData.category),
        sellerId: 5,
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
          create: uploadResponse.url.map(
            (url: { original: string; thumbnail: string }) => ({
              url: url.thumbnail,
            })
          ),
        },
      },

      include: {
        stock: true,
        images: true,
      },
    });

    revalidatePath("/products");
    return { message: "Product successfully created" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { message: "An error occurred while creating the product" };
  }
}
