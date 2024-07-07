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
  const order = await db.order.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error("No Order found");
  }

  return order;
}
