'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedItem } from "@/lib/actions/filter";

const ItemCarousel = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["itemCarousel"],
    queryFn: async () => await getFeaturedItem(),
    refetchOnWindowFocus: false,
    staleTime: 300000,
    gcTime: 600000,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (data && data.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 7000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [data]);

  if (error) return <h1>{error.message}</h1>;

  if (isLoading) {
    return (
      <div className="py-2 relative pb-10">
        <div className="w-full border rounded-lg overflow-hidden">
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse  rounded-md w-40 h-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className="py-2 relative pb-10">
      <div className="w-full bg-transparent rounded-lg overflow-hidden relative group">
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="default"
            variant="outline"
            className="text-white/90  py-4 md:py-10 "
            onClick={handlePrevClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="default"
            variant="outline"
            className="text-white/90  py-4 md:py-10 "
            onClick={handleNextClick}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;

const CarouselItem = ({ item }: { item: any }) => {
  return (
    <div className="w-full shrink-0 relative h-80 ">
      <Image
        alt={item.name}
        className="object-cover w-full h-full opacity-70"
        height={400}
        src={item.imageUrl}
        width={400}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/80 text-center space-y-4">
          <h3 className="text-3xl font-bold">{item.title}</h3>
          <p className="text-lg font-semibold">${item.price}</p>
          <Button variant={"ghost"} className="px-6 py-2">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
