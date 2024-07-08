"use server";

import db from "../db";

export async function fetchOrderById(orderId: number) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

export async function fetchOrderByUserId(userId: number) {
  const orders = await db.order.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  if (!orders) {
    throw new Error("No Order found");
  }

  return orders.map((order) => ({
    ...order,
    image: order.items[0]?.product.imageUrl || "/clothing.jpg",
  }));
}
