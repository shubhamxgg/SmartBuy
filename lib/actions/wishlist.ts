"use server";

import db from "../db";

export interface WishlistParams {
  userId: number;
  skip?: number;
  take?: number;
}

export interface WishList {
  userId: number;
  productId: number;
}

export async function createWishlist({ productId, userId }: WishList) {
  try {
    const wishlist = await db.wishlist.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
    });

    const existingItems = await db.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    if (existingItems) {
      throw new Error("Product already in wishlist");
    }

    const wishlistItems = await db.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
      include: {
        product: true,
      },
    });

    return wishlistItems;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw new Error("Failed to create wishlist");
  }
}
export async function removeFromWishlist({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}) {
  try {
    const wishlist = await db.wishlist.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    return await db.wishlistItem.deleteMany({
      where: {
        productId,
        wishlistId: wishlist.id,
      },
    });
  } catch (error) {
    console.error("Failed to remove item from wishlist:", error);
    throw new Error("Failed to remove item from wishlist");
  }
}

export async function fetchAllWishlist({
  userId,
  skip = 0,
  take = 10,
}: WishlistParams) {
  try {
    const wishlist = await db.wishlist.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!wishlist) {
      return {
        items: [],
        totalItems: 0,
        nextCursor: null,
      };
    }

    const items = await db.wishlistItem.findMany({
      where: { wishlistId: wishlist.id },
      include: {
        product: true,
      },
      skip,
      take: take + 1,
      orderBy: { id: "desc" },
    });

    const hasNextPage = items.length > take;
    const nextCursor = hasNextPage ? skip + take : null;

    const paginatedItems = hasNextPage ? items.slice(0, take) : items;

    const totalItems = await db.wishlistItem.count({
      where: { wishlistId: wishlist.id },
    });

    return {
      items: paginatedItems,
      totalItems,
      nextCursor,
    };
  } catch (error) {
    console.log("Error fetching wishlist:", error);
    throw new Error("Error fetching wishlist");
  }
}
