import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { LazyImage } from "../lazy-image";

interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}
interface CarouselCardType {
  item: CarouselItem;
}

export function CarouselCard({ item }: CarouselCardType) {
  return (
    <div className="w-full shrink-0 relative h-[400px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0">
        <LazyImage
          src={item.imageUrl}
          alt={item.title}
          priority={false}
          className="transition-transform duration-300 hover:scale-105"
          sizes="100vw"
        />
      </div>
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
        <div className="max-w-lg">
          <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
            {item.title}
          </h3>
          <p className="text-2xl font-semibold text-primary mb-6">
            ${item.price}
          </p>
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
}
