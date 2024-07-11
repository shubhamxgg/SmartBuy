"use server";
import db from "../db";
import { z } from "zod";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function registerUser(input: unknown) {
  try {
    const { email, password } = userSchema.parse(input);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split("@")[0],
      },
    });

    return {
      success: true,
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to register user",
    };
  }
}

export async function loginUser(input: unknown) {
  try {
    const { email, password } = loginSchema.parse(input);
    const user = await db.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("60m")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const refreshToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return {
      success: true,
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { success: false, message: "Authentication failed" };
  }
}

export async function refreshAccessToken() {
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) throw new Error("No refresh token");

  try {
    const { payload } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const accessToken = await new SignJWT({ userId: payload.userId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const user = await db.user.findUnique({
      where: { id: payload.userId as number },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { success: false, message: "Failed to refresh token" };
  }
}

export async function logoutUser() {
  try {
    cookies().set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Error logging out user:", error);
    return { success: false, message: "Failed to logout" };
  }
}
