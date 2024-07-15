"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { MinusIcon, PlusIcon, ShoppingCart, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

const ItemFeaturedBuy = () => {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    id: 1,
    name: "Google Pixel 8 Pro",
    price: 700,
    originalPrice: 799,
    imageUrl: "/images/mobile/google-pixel-6.jpg",
    description: "Experience the latest in mobile technology with the Google Pixel 8 Pro. Featuring an advanced camera system, powerful processor, and stunning display.",
    features: ["5G Connectivity", "Advanced AI", "All-day Battery"],
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

  if (loading) {
    return (
      <Card className="flex flex-col lg:flex-row bg-card">
        <div className="p-5 w-full lg:w-1/2">
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
        <CardContent className="p-5 flex flex-col flex-1">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col lg:flex-row bg-card overflow-hidden">
      <div className="p-8 w-full lg:w-1/2 bg-white">
        <div className="relative h-80 w-full rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <CardContent className="p-8 flex flex-col flex-1">
        <Badge className="w-fit mb-4">Featured Product</Badge>
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="ml-2 text-lg text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature, index) => (
            <Badge key={index} variant="secondary">{feature}</Badge>
          ))}
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-4 w-full">
          <Button className="flex-1" variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button className="flex-1">
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemFeaturedBuy;