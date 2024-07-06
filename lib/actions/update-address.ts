"use server";

import { z } from "zod";
import db from "../db";

const schema = z.object({
  id: z.number().int(),
  street: z.string().nonempty({ message: "Street is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  zipCode: z.string().nonempty({ message: "Postal Code is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  userId: z.number().int(),
});

export async function updateAddress(
  formData: FormData,
  prevState: any
): Promise<any> {
  const validatedFields = schema.safeParse({
    id: Number(formData.get("id")),
    street: formData.get("street"),
    city: formData.get("city"),
    zipCode: formData.get("zipCode"),
    country: formData.get("country"),
    userId: Number(formData.get("userId")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const addressData = validatedFields.data;
  console.log(addressData, "FormData");
  try {
    // const updatedAddress = await db.address.update({
    //   where: { id: addressData.id },
    //   data: addressData,
    // });
    // return updatedAddress;
  } catch (error) {
    throw new Error("Failed to update address");
  }
}
