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

export async function removeItemFromWishlist({ productId, userId }: WishList) {
  try {
    const wishlist = await db.wishlist.findFirst({
      where: {
        userId,
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    return await db.wishlistItem.deleteMany({
      where: {
        wishlistId: wishlist.id,
        productId,
      },
    });
  } catch (error) {
    throw new Error("Error removing item from wishlist");
  }
}

export async function getWishlist({
  userId,
  skip = 0,
  take = 0,
}: WishlistParams) {
  try {
    const wishlist = await db.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
          skip,
          take,
        },
      },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }
    return {
      items: wishlist.items,
      nextCursor: wishlist.items.length === take ? skip + take : null,
    };
  } catch (error) {
    throw new Error("Error fetching wishlist");
  }
}
