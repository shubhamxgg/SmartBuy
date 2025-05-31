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

export async function fetchOrderByUserId({
  userId,
  page,
  limit,
}: {
  userId: number;
  page?: number;
  limit?: number;
}) {
  userIdSchema.parse(userId);
  const currentPage = page ?? 1;
  const currentLimit = limit ?? 10;
  const skip = (currentPage - 1) * currentLimit;
  const totalOrders = await db.order.count({ where: { userId } });

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
              title: true,
              imageUrl: true,
            },
          },
        },
      },
    },
    skip: skip,
    take: limit,
  });

  if (!orders || orders.length === 0) {
    return [];
  }

  return {
    orders,
    total: totalOrders,
    page,
    limit,
  };
}
