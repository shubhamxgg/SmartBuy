import { z } from "zod";
import db from "../db";

const userIdSchema = z.number().positive();

export async function isAuthorized(userId: number): Promise<boolean> {
  const validation = userIdSchema.safeParse(userId);
  if (!validation.success) {
    console.error(`Invalid userId: ${userId}`);
    return false;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return false;
    }
    const isAuthorized = user.role === "USER" || user.role === "ADMIN";

    return isAuthorized;
  } catch (error) {
    return false;
  }
}
