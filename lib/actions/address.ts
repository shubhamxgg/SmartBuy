"use server";
import db from "../db";

interface Props {
  userId: number;
}

export async function getUserAddresses({ userId }: any) {
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

export async function deleteAddress(addressId: number, userId: number) {
  try {
    await db.address.delete({
      where: { id: addressId, userId: userId },
    });
    return { success: true, message: "Address deleted successfully" };
  } catch (error) {
    console.error("Error deleting address:", error);
    return { success: false, message: "Failed to delete address" };
  }
}
