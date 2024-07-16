import prisma from "@/lib/prisma";
import { WishlistParams } from "../actions/wishlist";



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
      nextCursor: wishlist.items.length === take ? + take : null,
    };
  } catch (error) {
    throw new Error("Error fetching wishlist");
  }
}

