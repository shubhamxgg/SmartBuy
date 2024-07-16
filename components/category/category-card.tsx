import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

interface CategoryCardProps {
  category: any;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?categoryId=${category.id}`} passHref>
      <Card className="group relative w-72 h-48 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110 bg-white"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
        <CardContent className="relative z-10 h-full flex flex-col justify-end p-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300 mb-2">
            {category.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300 group-hover:text-primary transition-colors duration-300">
              Explore Category
            </span>
            <svg
              className="w-5 h-5 text-gray-300 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </CardContent>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Card>
    </Link>
  );
}
