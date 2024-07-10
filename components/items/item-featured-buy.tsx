"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const ItemFeaturedBuy = () => {
  
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    id: 1,
    name: "Google Pixel 8 Pro",
    price: 700,
    imageUrl: "/images/mobile/google-pixel-6.jpg",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Card className="flex flex-col lg:flex-row bg-card text-white">
        <div className="p-5 w-full max-w-md mx-auto">
          <Skeleton className="h-64 w-full aspect-square mb-4" />
        </div>
        <CardContent className="p-5 flex flex-col flex-1 bg-card text-white">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-5 w-1/2 mb-4" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col lg:flex-row bg-card text-white">
      <div className="p-5 w-full max-w-md mx-auto">
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain bg-white opacity-80 w-full h-full"
          />
        </div>
      </div>
      <CardContent className="p-5 flex flex-col flex-1 bg-card text-white">
        <CardHeader className="border-b border-gray-700 pb-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
        </CardHeader>
        <div className="pt-4">
          <p className="mb-1 text-lg text-primary">${product.price}</p>

          <div className="flex flex-col pt-2">
            <span className="text-gray-400">Quantity</span>
            <div className="flex items-center space-x-2">
              <Button
                size="default"
                variant="outline"
                onClick={() => handleQuantityChange(quantity - 1)}
                className="text-gray-400 hover:text-white"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-16 text-center text-white bg-transparent"
                min="1"
                aria-label="Quantity"
              />
              <Button
                size="default"
                variant="outline"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="text-gray-400 hover:text-white"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="pt-10 flex gap-2 w-full">
            <Button variant="outline" aria-label="Go to cart">
              Go to cart
            </Button>
            <Button aria-label="Buy now">Buy now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemFeaturedBuy;
