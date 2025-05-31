import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageUrl: z.string().url().optional(),
  categoryId: z.number(),
  sellerId: z.number(),
  status: z.enum(["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"]),
  featured: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  seller: z
    .object({
      id: z.number(),
      name: z.string().optional(),
    })
    .optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export function safeParseProduct(product: unknown): Partial<Product> {
  const safeParse = ProductSchema.safeParse(product);
  if (safeParse.success) {
    return safeParse.data;
  } else {
    console.error("Product parsing error:", safeParse.error);
    return {
      id:
        typeof product === "object" && product !== null && "id" in product
          ? Number(product.id)
          : 0,
      title:
        typeof product === "object" && product !== null && "title" in product
          ? String(product.title)
          : "Unknown Product",
      description:
        typeof product === "object" &&
        product !== null &&
        "description" in product
          ? String(product.description)
          : "",
      price:
        typeof product === "object" && product !== null && "price" in product
          ? Number(product.price)
          : 0,
      imageUrl:
        typeof product === "object" && product !== null && "imageUrl" in product
          ? String(product.imageUrl)
          : "/placeholder-image.jpg",
      categoryId:
        typeof product === "object" &&
        product !== null &&
        "categoryId" in product
          ? Number(product.categoryId)
          : 0,
      sellerId:
        typeof product === "object" && product !== null && "sellerId" in product
          ? Number(product.sellerId)
          : 0,
      status:
        typeof product === "object" && product !== null && "status" in product
          ? product.status === "AVAILABLE" ||
            product.status === "OUT_OF_STOCK" ||
            product.status === "DISCONTINUED"
            ? product.status
            : "AVAILABLE"
          : "AVAILABLE",
      featured:
        typeof product === "object" && product !== null && "featured" in product
          ? Boolean(product.featured)
          : false,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller:
        typeof product === "object" &&
        product !== null &&
        "seller" in product &&
        typeof product.seller === "object" &&
        product.seller !== null
          ? {
              id: "id" in product.seller ? Number(product.seller.id) : 0,
              name:
                "name" in product.seller
                  ? String(product.seller.name)
                  : "Unknown Seller",
            }
          : undefined,
    };
  }
}

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const SellerSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const SearchParamsSchema = z
  .object({
    categoryId: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined)),
    sellerId: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined)),
    minPrice: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined)),
    maxPrice: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined)),
    status: z.enum(["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"]).optional(),
    featured: z
      .enum(["true", "false"])
      .optional()
      .transform((val) => val === "true"),
    query: z.string().optional(),
    sortBy: z.enum(["createdAt", "price", "title"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
  })
  .strict();

export type SearchParams = z.infer<typeof SearchParamsSchema>;

export const ProductCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  categoryId: z.number().int("Category ID must be an integer"),
  sellerId: z.number().int("Seller ID must be an integer"),
  status: z.enum(["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"]),
  featured: z.boolean(),
  sku: z.string().min(1, "SKU is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
  lowStockThreshold: z
    .number()
    .int("Low stock threshold must be an integer")
    .nonnegative("Low stock threshold cannot be negative"),
});

export const ProductUpdateSchema = ProductCreateSchema.partial();

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
