"use server";

import db from "../db";

import { ProductStatus } from "@prisma/client";

interface Product {
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
}

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
}: Product) {
  try {
    // const seller = await db.seller.findUnique({
    //   where: { userId: sellerId },
    // });

    // if (!seller) {
    //   throw new Error("Only sellers can add products");
    // }

    const product = await db.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        categoryId,
        sellerId,
        status,
        featured,
      },
    });

    await db.stock.create({
      data: {
        productId: product.id,
        sku,
        quantity,
        lowStockThreshold,
      },
    });

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

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        seller: {
          include: {
            user: true,
          },
        },
        stock: true,
        images: true,
        reviews: true,
      },
    });
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}

export async function getProductById(id: number) {
  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        seller: {
          include: {
            user: true,
          },
        },
        stock: true,
        images: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}

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
