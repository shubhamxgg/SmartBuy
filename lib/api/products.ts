import { WishlistParams } from "../actions/wishlist";
import prisma from "@/lib/prisma";

export async function getWishlist({ userId, skip, take }: WishlistParams) {
  try {
    const wishlist = await prisma.wishlist.findUnique({
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
      nextCursor: wishlist.items.length === take ? +take : null,
    };
  } catch (error) {
    throw new Error("Error fetching wishlist");
  }
}

export async function getFeaturedItem() {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
      },
      include: {
        images: true,
      },
      take: 4,
    });
    return products;
  } catch (error) {
    console.error("Error fetching featured items:", error);
    throw new Error("Unable to fetch featured items");
  }
}
