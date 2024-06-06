"use server";

import { ProductStatus } from "@prisma/client";
import db from "../db";

export async function createProduct({
  title,
  description,
  price,
  imageUrl,
  categoryId,
  sellerId,
  status,
  featured,
  sku,
  quantity,
  lowStockThreshold,
  additionalImages,
}: {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  sellerId: number;
  status: ProductStatus;
  featured: boolean;
  sku: string;
  quantity: number;
  lowStockThreshold: number;
  additionalImages: string[];
}) {
  try {
    const seller = 1
    // Ensure seller exists
    // const seller = await db.seller.findUnique({
    //   where: { userId: sellerId },
    // });

    // if (!seller) {
    //   throw new Error("Only sellers can add products");
    // }

    // Create the product
    const product = await db.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        categoryId,
        sellerId: seller,
        status,
        featured,
      },
    });

    // Create stock details
    await db.stock.create({
      data: {
        productId: product.id,
        sku,
        quantity,
        lowStockThreshold,
      },
    });

    // Handle additional images if any
    if (additionalImages && additionalImages.length > 0) {
      const images = additionalImages.map((url) => ({
        productId: product.id,
        url,
      }));
      await db.productImage.createMany({
        data: images,
      });
    }

    return product;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the product");
  }
}
