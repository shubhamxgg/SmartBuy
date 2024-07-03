import { useEffect, useRef } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem as BaseCarouselItem,
} from "../ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedItem } from "@/lib/actions/get-featured-item";

const ItemCarousel = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["itemCarousel"],
    queryFn: async () => await getFeaturedItem(),
    refetchOnWindowFocus: false,
    staleTime: 300000,
    gcTime: 600000,
  });

  const currentIndex = useRef(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % data.length;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(-${
            currentIndex.current * 100
          }%)`;
        }
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [data]);

  if (error) return <h1>{error.message}</h1>;

  if (isLoading) {
    return (
      <div className="py-2 relative pb-10">
        <div className="w-full border border-red-50 rounded-sm overflow-hidden">
          <Skeleton className="w-full h-80" />
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="py-2 relative pb-10">
      <Carousel className="w-full border rounded-sm overflow-hidden">
        <CarouselContent
          ref={carouselRef}
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex.current * 100}%)` }}
        >
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ItemCarousel;

const CarouselItem = ({ item }: any) => {
  return (
    <BaseCarouselItem>
      <div className="w-full overflow-hidden">
        <Image
          alt={item.name}
          className="object-cover w-full max-h-[400px] h-full overflow-hidden"
          height={400}
          src={item.imageUrl}
          width={400}
        />
      </div>
    </BaseCarouselItem>
  );
};
