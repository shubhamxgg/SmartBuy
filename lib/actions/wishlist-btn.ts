"use server";
import prisma from "@/lib/prisma";

export async function checkWishlistStatus(
  userId: number | null,
  productId: number
) {
  if (!userId) return false;

  const wishlistItem = await prisma.wishlistItem.findFirst({
    where: {
      wishlist: {
        userId: userId,
      },
      productId: productId,
    },
  });

  return !!wishlistItem;
}

export async function toggleWishlistItem(
  userId: number | null,
  productId: number
) {
  if (!userId) throw new Error("User not authenticated");

  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: userId },
  });

  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: { userId: userId },
    });
  }

  const existingItem = await prisma.wishlistItem.findFirst({
    where: {
      wishlistId: wishlist.id,
      productId: productId,
    },
  });

  if (existingItem) {
    await prisma.wishlistItem.delete({
      where: { id: existingItem.id },
    });
    return false;
  } else {
    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId: productId,
      },
    });
    return true;
  }
}
