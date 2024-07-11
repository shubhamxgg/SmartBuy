"use server";

import db from "../db";
import { z } from "zod";

const orderIdSchema = z.number().positive().int();
const userIdSchema = z.number().positive().int();

export async function fetchOrderById(orderId: number) {
  orderIdSchema.parse(orderId);

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  return order;
}

export async function fetchOrderByUserId(userId: number) {
  userIdSchema.parse(userId);

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

  if (!orders || orders.length === 0) {
    return [];
  }

  return orders.map((order) => ({
    ...order,
    image: order.items[0]?.product?.imageUrl || "/clothing.jpg",
  }));
}