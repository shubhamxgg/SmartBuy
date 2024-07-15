import { z } from "zod";
import { CategorySchema } from "../schemas";
import prisma from "@/lib/prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories.map((category) => CategorySchema.parse(category));
}

export async function getSellers() {
  const sellers = await prisma.seller.findMany();
  const LenientSellerSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
  });

  return sellers.map((seller) => {
    const parsedSeller = LenientSellerSchema.parse(seller);
    return {
      ...parsedSeller,
      name: parsedSeller.name || `Seller ${parsedSeller.id}`,
    };
  });
}
