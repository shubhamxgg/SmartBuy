"use server";

import { z } from "zod";
import db from "../db";

const OrderItemSchema = z.object({
  title: z.string(),
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

export async function createOrder(orderData: any) {
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
          create: order.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            image: "",
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

    const emailResponse = await fetch("http:localhost:3000/api/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: newOrder.id,
        orderItems: newOrder.items,
        orderDate: newOrder.createdAt,
        items: orderData.items.map((item: any) => ({
          name: item.title,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        shipping: `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`,
        subtotal: newOrder.totalAmount,
        total: newOrder.totalAmount,
        status: newOrder.status,
      }),
    });

    console.log("Email response:", emailResponse);

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
