"use server";

import db from "../db";
import { z } from "zod";
import { isAuthorized } from "./authorization";

const addressSchema = z.object({
  userId: z.number().positive(),
});

const deleteAddressSchema = z.object({
  addressId: z.number().positive(),
  userId: z.number().positive(),
});

export async function getUserAddresses(input: unknown) {
  try {
    const { userId } = addressSchema.parse(input);

    if (!(await isAuthorized(userId))) {
      throw new Error("Unauthorized access");
    }

    const addresses = await db.address.findMany({
      where: { userId },
    });
    return { success: true, addresses };
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch addresses",
    };
  }
}

export async function deleteAddress(input: unknown) {
  try {
    const { addressId, userId } = deleteAddressSchema.parse(input);

    if (!(await isAuthorized(userId))) {
      throw new Error("Unauthorized access");
    }

    await db.address.delete({
      where: { id: addressId },
    });
    return { success: true, message: "Address deleted successfully" };
  } catch (error) {
    console.error("Error deleting address:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete address",
    };
  }
}
