export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return new Response("No files uploaded", { status: 400 });
  }

  const buffers = await Promise.all(
    files.map(async (file) => Buffer.from(await file.arrayBuffer()))
  );

  const variants = [
    {
      name: "original",
      width: 600,
      height: 400,
    },
    {
      name: "thumbnail",
      width: 150,
      height: 150,
    },
  ];
  const uploadDir = path.join(process.cwd(), "public", "uploads", "sharp");
  await mkdir(uploadDir, { recursive: true });
  const results: Array<Record<string, string>> = [];

  for (const file of files) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const buffer = Buffer.from(await file.arrayBuffer());
    const id = Date.now().toString(36);
    const urls: Record<string, string> = {};

    for (const { name, width, height } of variants) {
      const outBuf = await sharp(buffer)
        .resize(width, height, { fit: "cover" })
        .webp({ quality: 80 })
        .toBuffer();

      const filename = `${name}-${id}-x.webp`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, new Uint8Array(outBuf));

      const blob = await put(`original/${filename}`, outBuf, {
        access: "public",
        addRandomSuffix: true,
      });

      urls[name] = blob.url;
    }

    results.push(urls);
  }
  return NextResponse.json({
    message: "Files uploaded successfully",
    url: results,
  });
}
