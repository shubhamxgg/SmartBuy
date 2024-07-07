"use server";

import { revalidatePath } from "next/cache";
import db from "../db";
import { Order } from "../type";

export async function createOrder(order: any) {
  try {
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

    // await db.address.create({
    //   data: {
    //     userId: order.userId,
    //     ...order.shippingAddress,
    //   },
    // });

    revalidatePath(`orders/${newOrder.id}`);
    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.log("Failed to create order", error);
    return { success: false, error: "Failed to create order" };
  }
}
