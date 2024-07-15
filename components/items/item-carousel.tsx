"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedItem } from "@/lib/actions/filter";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface CarouselItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const ItemCarousel = () => {
  const { data, isLoading, error } = useQuery<CarouselItem[], Error>({
    queryKey: ["itemCarousel"],
    queryFn: async () => {
      const items = await getFeaturedItem();
      return items.map(item => ({
        ...item,
        id: item.id.toString()
      }));
    },
    refetchOnWindowFocus: false,
    staleTime: 300000,
    gcTime: 600000,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const handleIndexChange = useCallback((newIndex: number) => {
    if (data) {
      setCurrentIndex((prevIndex) => (newIndex + data.length) % data.length);
    }
  }, [data]);

  if (error) return <div className="text-red-500 text-center py-8">{error.message}</div>;

  if (isLoading) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-card my-5">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg my-5">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 z-10">
        <Button
          size="sm"
          variant="ghost"
          className="bg-black/20 text-white hover:bg-black/40 hover:text-white"
          onClick={() => handleIndexChange(currentIndex - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="flex items-center space-x-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              onClick={() => handleIndexChange(index)}
            />
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="bg-black/20 text-white hover:bg-black/40 hover:text-white"
          onClick={() => handleIndexChange(currentIndex + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const CarouselItem = ({ item }: { item: CarouselItem }) => {
  return (
    <div className="w-full shrink-0 relative h-[400px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
      <Image
        alt={item.title}
        className="object-contain bg-white w-full h-full"
        src={item.imageUrl}
        fill
        priority
      />
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
        <div className="max-w-lg">
          <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
          <p className="text-2xl font-semibold text-primary mb-6">${item.price}</p>
          <Link href={`/items/${item.id}`}>
            <Button size="lg" className="font-semibold px-6 py-3 text-base">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;