import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Buy",
  description: "Your one-stop shop for all things smart.",
  keywords: [
    "smart",
    "buy",
    "ecommerce",
    "shop",
    "products",
    "electronics",
    "gadgets",
    "smart home",
    "smart devices",
    "smart appliances",
    "smart gadgets",
    "smart home appliances",
    "smart home gadgets",
    "smart home appliances",
    "smart home gadgets",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/logo/icon.svg",
  },
  openGraph: {
    title: "Smart Buy",
    description:
      "Your one-stop shop for all things smart. Smart Buy is a platform for buying and selling smart products.",
    url: "https://smartbuyx.netlify.app",
    siteName: "Smart Buy",
    images: ["/og-image/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Buy",
    description:
      "Your one-stop shop for all things smart. Smart Buy is a platform for buying and selling smart products.",
    images: ["/og-image/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
