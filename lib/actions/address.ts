"use server";
import db from "../db";

export async function getUserAddresses({ userId }: { userId: number }) {
  try {
    //verfiyUser
    const addresses = await db.address.findMany({
      where: { userId },
    });
    return addresses;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw new Error("Failed to fetch addresses");
  }
}

export async function createUserAddress() {}

export async function editUserAddress() {}

export async function deleteUserAddress() {}
