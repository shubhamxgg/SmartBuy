"use server";

import { Product } from "@/type";
import db from "../db";

interface CartItems {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface CartProps {
  productId: number;
  quantity: number;
  userId: number;
}
interface removeCartProps {
  productId: number;
  userId: number;
}
interface clearCartProps {
  userId: number;
  cartId: number;
}

export async function getCartItem({
  userId,
}: {
  userId: number;
}): Promise<any> {
  try {
    const cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (cart) {
      const items = cart.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: item.product,
      }));
      return { cartId: cart.id, items };
    }
  } catch (error) {
    throw new Error("Cant find fetch cart ");
  }
}

export async function createCartItem({ productId, quantity, userId }: any) {
  try {
    const cart = await db.cart.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
    });

    const newItem = await db.cartItem.create({
      data: {
        productId,
        quantity,
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });
    return newItem;
  } catch (error) {
    throw new Error("Something went wrong in cart creating");
  }
}

export async function removeCartItem({ productId, userId }: removeCartProps) {
  try {
    const cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart) {
      await db.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
        },
      });
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Something went wrong in removing item from cart");
  }
}

export async function clearCartItem({ cartId, userId }: clearCartProps) {
  try {
    const cart = await db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart) {
      await db.cartItem.deleteMany({
        where: { cartId },
      });
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Something went wrong in removing item from cart");
  }
}

export async function updateCartItem({
  productId,
  quantity,
  userId,
}: CartProps) {
  try {
    const cart = await db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error("cart not found");
    }

    if (cart) {
      const update = await db.cartItem.updateMany({
        where: {
          cartId: cart.id,
          productId,
        },
        data: { quantity },
      });
      return update;
    } else {
      throw new Error("unable to update cart");
    }
  } catch {
    throw new Error("unable to update cart");
  }
}
