import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateElectronicsImages(): Promise<void> {
  const products = [
    { name: "4K Smart TV", imageUrl: "/images/electronics/4k-smart-tv.jpg" },
    {
      name: "Wireless Headphones",
      imageUrl: "/images/electronics/wireless-headphones.jpg",
    },
    {
      name: "Digital Camera",
      imageUrl: "/images/electronics/digital-camera.jpg",
    },
    { name: "Laptop", imageUrl: "/images/electronics/laptop.jpg" },
    {
      name: "Bluetooth Speaker",
      imageUrl: "/images/electronics/bluetooth-speaker.jpg",
    },
    {
      name: "Gaming Console",
      imageUrl: "/images/electronics/gaming-console.jpg",
    },
    { name: "Smartwatch", imageUrl: "/images/electronics/smartwatch.jpg" },
    { name: "Drone", imageUrl: "/images/electronics/drone.jpg" },
    { name: "Tablet", imageUrl: "/images/electronics/tablet.jpg" },
    {
      name: "Home Security Camera",
      imageUrl: "/images/electronics/home-security-camera.jpg",
    },
  ];

  for (const product of products) {
    try {
      const updatedProduct = await prisma.product.updateMany({
        where: {
          title: product.name,
          categoryId: 1, // Assuming 1 is the ID for electronics
        },
        data: {
          imageUrl: product.imageUrl,
        },
      });

      if (updatedProduct.count > 0) {
        console.log(`Updated image for product: ${product.name}`);
      } else {
        console.log(`No product found with name: ${product.name}`);
      }
    } catch (error) {
      console.error(`Failed to update product ${product.name}:`, error);
    }
  }
}

async function main() {
  try {
    console.log("Starting image update process...");
    await updateElectronicsImages();
    console.log("Image update process completed successfully!");
  } catch (error) {
    console.error("An error occurred during the image update process:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Failed to update images:", error);
});
