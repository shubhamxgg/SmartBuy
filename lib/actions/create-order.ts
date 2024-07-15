"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import db from "../db";

const OrderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

const OrderSchema = z.object({
  userId: z.number().int().positive(),
  totalAmount: z.number().positive(),
  items: z.array(OrderItemSchema),
  shippingAddress: AddressSchema,
});

export async function createOrder(orderData: unknown) {
  
  try {
    const order = OrderSchema.parse(orderData);
    await db.address.upsert({
      where: {
        id: order.userId,
        zipCode: order.shippingAddress.zipCode,
        country: order.shippingAddress.country,
      },
      update: {},
      create: {
        userId: order.userId,
        ...order.shippingAddress,
      },
    });

    const newOrder = await db.order.create({
      data: {
        userId: order.userId,
        totalAmount: order.totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
        shippingStatus: "PENDING",
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            image: "/order.jpg",
          })),
        },
        payments: {
          create: {
            paymentMethod: "COD",
            paymentStatus: "PENDING",
          },
        },
      },
      include: {
        items: true,
        payments: true,
      },
    });

    revalidatePath(`/orders/${newOrder.id}`);
    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Failed to create order", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid order data",
        details: error.errors,
      };
    }
    return { success: false, error: "Failed to create order" };
  }
}
