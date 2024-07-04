"use server";

import { PrismaClient, ProductStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createProduct } from "@/lib/actions/product";

const prisma = new PrismaClient();
const categories = [
  { id: 1, name: "Electronic" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home" },
  { id: 4, name: "Movie" },
  { id: 5, name: "Books" },
  { id: 6, name: "Sports" },
  { id: 7, name: "Mobile" },
];

async function seedDatabase() {
  for (let i = 1; i < 100; i++) {
    const category = faker.helpers.arrayElement(categories);
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      imageUrl: faker.image.url(),
      categoryId: category.id,
      sellerId: 5,
      status: faker.helpers.arrayElement([
        ProductStatus.AVAILABLE,
        ProductStatus.OUT_OF_STOCK,
        ProductStatus.DISCONTINUED,
      ]),
      featured: faker.datatype.boolean(),
      sku: faker.string.alphanumeric(10),
      quantity: faker.number.int({ min: 1, max: 100 }),
      lowStockThreshold: faker.number.int({ min: 1, max: 10 }),
      additionalImages: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
    };

    try {
      await createProduct(product);
      console.log(`Product ${i + 1} created successfully`);
    } catch (error) {
      console.error(`Failed to create product ${i + 1}:`, error);
    }
  }
}

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
});
