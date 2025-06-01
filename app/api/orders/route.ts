import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  unstable_noStore();
  const searchParams = request.nextUrl.searchParams;
  const userId = Number(searchParams.get("userId"));
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  if (!userId) {
    return NextResponse.json({ error: "userId not found" }, { status: 400 });
  }

  const skip = (page - 1) * limit;
  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
