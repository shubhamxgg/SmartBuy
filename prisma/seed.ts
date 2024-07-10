"use server";

import { PrismaClient, ProductStatus } from "@prisma/client";
import { createProduct } from "@/lib/actions/product";

const prisma = new PrismaClient();

interface ProductData {
  name: string;
  description: string;
  priceRange: [number, number];
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPrice(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomSKU(): string {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
}

const seller = 5;

async function seedCategory(
  categoryId: number,
  products: ProductData[]
): Promise<void> {
  for (let product of products) {
    await createProduct({
      title: product.name,
      description: product.description,
      price: getRandomPrice(product.priceRange[0], product.priceRange[1]),
      imageUrl: `/images/category/${product.name
        .toLowerCase()
        .replace(/ /g, "-")}.jpg`,
      categoryId,
      sellerId: seller,
      status: getRandomElement(Object.values(ProductStatus)),
      featured: Math.random() < 0.2,
      sku: getRandomSKU(),
      quantity: getRandomInt(1, 100),
      lowStockThreshold: getRandomInt(1, 10),
      additionalImages: [
        `/images/category${categoryId}/${product.name
          .toLowerCase()
          .replace(/ /g, "-")}-1.jpg`,
        `/images/category${categoryId}/${product.name
          .toLowerCase()
          .replace(/ /g, "-")}-2.jpg`,
        `/images/category${categoryId}/${product.name
          .toLowerCase()
          .replace(/ /g, "-")}-3.jpg`,
      ],
    });
    console.log(`Created product: ${product.name}`);
  }
}

async function seedElectronics(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "4K Smart TV",
      description: "55-inch 4K Ultra HD Smart LED TV",
      priceRange: [300, 1000],
    },
    {
      name: "Wireless Headphones",
      description: "Noise-cancelling Bluetooth headphones",
      priceRange: [50, 300],
    },
    {
      name: "Digital Camera",
      description: "20MP digital camera with 5x optical zoom",
      priceRange: [100, 500],
    },
    {
      name: "Laptop",
      description: "15.6-inch laptop with SSD and 8GB RAM",
      priceRange: [400, 1200],
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable waterproof Bluetooth speaker",
      priceRange: [30, 150],
    },
    {
      name: "Gaming Console",
      description: "Next-gen gaming console with 1TB storage",
      priceRange: [400, 600],
    },
    {
      name: "Smartwatch",
      description: "Fitness tracking smartwatch with heart rate monitor",
      priceRange: [100, 350],
    },
    {
      name: "Drone",
      description: "4K camera drone with 30-minute flight ti me",
      priceRange: [200, 800],
    },
    {
      name: "Tablet",
      description: "10-inch tablet with retina display",
      priceRange: [150, 500],
    },
    {
      name: "Home Security Camera",
      description: "WiFi-enabled home security camera system",
      priceRange: [80, 250],
    },
  ];

  await seedCategory(1, products);
}

async function seedFashion(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "Denim Jeans",
      description: "Classic blue denim jeans",
      priceRange: [20, 100],
    },
    {
      name: "Cotton T-Shirt",
      description: "Comfortable cotton t-shirt",
      priceRange: [10, 50],
    },
    {
      name: "Leather Jacket",
      description: "Stylish leather jacket",
      priceRange: [50, 200],
    },
    {
      name: "Summer Dress",
      description: "Floral print summer dress",
      priceRange: [30, 80],
    },
    {
      name: "Formal Suit",
      description: "Two-piece formal suit",
      priceRange: [100, 300],
    },
    {
      name: "Athletic Shoes",
      description: "Comfortable athletic running shoes",
      priceRange: [40, 120],
    },
    {
      name: "Winter Coat",
      description: "Warm winter coat with fur hood",
      priceRange: [80, 250],
    },
    {
      name: "Silk Scarf",
      description: "Elegant silk scarf",
      priceRange: [20, 60],
    },
    {
      name: "Leather Belt",
      description: "Genuine leather belt",
      priceRange: [15, 50],
    },
    {
      name: "Sunglasses",
      description: "UV protection sunglasses",
      priceRange: [25, 100],
    },
  ];

  await seedCategory(2, products);
}

async function seedHome(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "Coffee Maker",
      description: "12-cup programmable coffee maker",
      priceRange: [20, 100],
    },
    {
      name: "Bed Sheets Set",
      description: "100% cotton bed sheets set",
      priceRange: [30, 150],
    },
    {
      name: "Kitchen Knife Set",
      description: "6-piece stainless steel kitchen knife set",
      priceRange: [50, 200],
    },
    {
      name: "Vacuum Cleaner",
      description: "Bagless upright vacuum cleaner",
      priceRange: [80, 300],
    },
    {
      name: "Toaster Oven",
      description: "Countertop toaster oven",
      priceRange: [40, 120],
    },
    {
      name: "Throw Pillows",
      description: "Decorative throw pillows set of 2",
      priceRange: [15, 50],
    },
    {
      name: "Area Rug",
      description: "5x7 feet area rug",
      priceRange: [50, 200],
    },
    {
      name: "Table Lamp",
      description: "Modern table lamp with LED bulb",
      priceRange: [25, 80],
    },
    {
      name: "Cookware Set",
      description: "10-piece non-stick cookware set",
      priceRange: [70, 250],
    },
    {
      name: "Blender",
      description: "High-speed countertop blender",
      priceRange: [30, 150],
    },
  ];

  await seedCategory(3, products);
}

async function seedMovies(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "Inception DVD",
      description: "Christopher Nolan's mind-bending thriller",
      priceRange: [10, 30],
    },
    {
      name: "The Godfather Blu-ray",
      description: "Francis Ford Coppola's classic mafia epic",
      priceRange: [15, 40],
    },
    {
      name: "Jurassic Park 4K",
      description: "Spielberg's dinosaur adventure in 4K",
      priceRange: [20, 50],
    },
    {
      name: "Pulp Fiction",
      description: "Quentin Tarantino's postmodern crime masterpiece",
      priceRange: [10, 30],
    },
    {
      name: "The Shawshank Redemption",
      description: "Inspiring prison drama based on Stephen King's novella",
      priceRange: [10, 30],
    },
    {
      name: "The Matrix Trilogy",
      description: "Sci-fi action trilogy box set",
      priceRange: [25, 60],
    },
    {
      name: "Schindler's List",
      description: "Steven Spielberg's powerful Holocaust drama",
      priceRange: [15, 35],
    },
    {
      name: "The Lord of the Rings Trilogy",
      description: "Extended editions of Peter Jackson's epic fantasy",
      priceRange: [30, 80],
    },
    {
      name: "Casablanca",
      description: "Classic romantic drama set in WWII",
      priceRange: [10, 25],
    },
    {
      name: "Star Wars: The Skywalker Saga",
      description: "Complete 9-movie saga box set",
      priceRange: [50, 150],
    },
  ];

  await seedCategory(4, products);
}

async function seedBooks(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "To Kill a Mockingbird",
      description: "Harper Lee's Pulitzer Prize-winning novel",
      priceRange: [5, 20],
    },
    {
      name: "1984",
      description: "George Orwell's dystopian classic",
      priceRange: [5, 20],
    },
    {
      name: "The Great Gatsby",
      description: "F. Scott Fitzgerald's Jazz Age novel",
      priceRange: [5, 20],
    },
    {
      name: "Pride and Prejudice",
      description: "Jane Austen's beloved romance novel",
      priceRange: [5, 20],
    },
    {
      name: "The Catcher in the Rye",
      description: "J.D. Salinger's classic coming-of-age story",
      priceRange: [5, 20],
    },
    {
      name: "The Hobbit",
      description: "J.R.R. Tolkien's fantasy adventure",
      priceRange: [8, 25],
    },
    {
      name: "Harry Potter Box Set",
      description: "Complete set of J.K. Rowling's wizarding world series",
      priceRange: [50, 120],
    },
    {
      name: "The Da Vinci Code",
      description: "Dan Brown's controversial thriller",
      priceRange: [7, 22],
    },
    {
      name: "The Alchemist",
      description: "Paulo Coelho's philosophical novel",
      priceRange: [6, 18],
    },
    {
      name: "Brave New World",
      description: "Aldous Huxley's futuristic dystopian novel",
      priceRange: [5, 20],
    },
  ];

  await seedCategory(5, products);
}

async function seedSports(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "Yoga Mat",
      description: "Non-slip exercise yoga mat",
      priceRange: [10, 50],
    },
    {
      name: "Dumbbells Set",
      description: "Adjustable dumbbells set",
      priceRange: [50, 200],
    },
    {
      name: "Tennis Racket",
      description: "Professional tennis racket",
      priceRange: [30, 150],
    },
    {
      name: "Basketball",
      description: "Official size and weight basketball",
      priceRange: [15, 50],
    },
    {
      name: "Soccer Ball",
      description: "Size 5 soccer ball",
      priceRange: [15, 50],
    },
    {
      name: "Treadmill",
      description: "Folding treadmill with incline feature",
      priceRange: [300, 1000],
    },
    {
      name: "Resistance Bands",
      description: "Set of 5 resistance bands",
      priceRange: [10, 40],
    },
    {
      name: "Jump Rope",
      description: "Adjustable length jump rope",
      priceRange: [5, 25],
    },
    {
      name: "Cycling Helmet",
      description: "Lightweight bike helmet",
      priceRange: [20, 80],
    },
    {
      name: "Fitness Tracker",
      description: "Waterproof fitness and activity tracker",
      priceRange: [30, 150],
    },
  ];

  await seedCategory(6, products);
}

async function seedMobile(): Promise<void> {
  const products: ProductData[] = [
    {
      name: "iPhone 13",
      description: "Apple's latest iPhone model",
      priceRange: [700, 1200],
    },
    {
      name: "Samsung Galaxy S21",
      description: "Samsung's flagship Android phone",
      priceRange: [600, 1100],
    },
    {
      name: "Google Pixel 6",
      description: "Google's premium smartphone",
      priceRange: [500, 1000],
    },
    {
      name: "OnePlus 9",
      description: "OnePlus flagship with Hasselblad camera",
      priceRange: [600, 900],
    },
    {
      name: "Xiaomi Mi 11",
      description: "Xiaomi's high-end smartphone",
      priceRange: [500, 800],
    },
    {
      name: "iPhone SE",
      description: "Apple's budget-friendly iPhone",
      priceRange: [400, 600],
    },
    {
      name: "Samsung Galaxy A52",
      description: "Mid-range Samsung smartphone",
      priceRange: [300, 500],
    },
    {
      name: "Motorola Edge",
      description: "Motorola's 5G-capable smartphone",
      priceRange: [400, 700],
    },
    {
      name: "Sony Xperia 1 III",
      description: "Sony's premium smartphone with 4K display",
      priceRange: [800, 1200],
    },
    {
      name: "Nokia 8.3",
      description: "Nokia's 5G smartphone",
      priceRange: [400, 600],
    },
  ];

  await seedCategory(7, products);
}

async function seedDatabase(): Promise<void> {
  try {
    console.log("Starting database seeding...");

    await seedElectronics();
    console.log("Electronics seeding completed.");

    await seedFashion();
    console.log("Fashion seeding completed.");

    await seedHome();
    console.log("Home products seeding completed.");

    await seedMovies();
    console.log("Movies seeding completed.");

    await seedBooks();
    console.log("Books seeding completed.");

    await seedSports();
    console.log("Sports products seeding completed.");

    await seedMobile();
    console.log("Mobile products seeding completed.");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("An error occurred during database seeding:", error);
  }
}

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
});
