"use server";

import db from "../db";

interface createCartProps {
  productId: number;
  quantity: number;
}

export async function createCart({ productId, quantity }: createCartProps) {
  const userId = 1;
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
    });

    return newItem;
  } catch (error) {
    throw new Error("Something went wrong in cart creating");
  }
}
