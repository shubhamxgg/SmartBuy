"use server";

import { z } from "zod";
import db from "../db";
import { FormState } from "../type";
import { revalidatePath } from "next/cache";

const schema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
});

export async function saveAddress(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    id: formData.get("id") ? Number(formData.get("id")) : undefined,
    userId: Number(formData.get("userId")),
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    zipCode: formData.get("zipCode"),
    country: formData.get("country"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Save Address.",
    };
  }

  const { id, userId, street, city, state, zipCode, country } =
    validatedFields.data;

  console.log(validatedFields.data, "Field value");

  try {
    let data;
    if (id) {
      data = await db.address.update({
        where: { id },
        data: { street, city, state, zipCode, country },
      });
    } else {
      data = await db.address.create({
        data: { userId, street, city, state, zipCode, country },
      });
    }

    return {
      success: true,
      message: id
        ? "Address Updated Successfully"
        : "Address Created Successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Database Error: Failed to Save Address.",
    };
  }
}
