import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem as BaseCarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const data = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555093596-009b0f066b96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZ1bGwlMjBoZCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1530075288903-69b220251c3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZ1bGwlMjBoZCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1669867484691-941a88d2d196?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZ1bGwlMjBoZCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
  {
    id: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
  {
    id: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
];

const ItemCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="py-2 relative pb-10">
        <div className="w-full border border-red-50 rounded-sm overflow-hidden">
          <Skeleton className="w-full h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 relative pb-10">
      <Carousel className="w-full border border-red-50 rounded-sm overflow-hidden">
        <CarouselContent
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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
          className="object-cover w-full max-h-[500px] h-[100%] overflow-hidden"
          height={400}
          src={item.image}
          width={400}
        />
      </div>
    </BaseCarouselItem>
  );
};
