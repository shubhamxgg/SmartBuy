import Image from 'next/image';
import { Product, Category, Seller } from '@prisma/client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from 'lucide-react';

type ExtendedProduct = Product & {
  category: Category;
  seller: Seller;
  stock: { quantity: number } | null;
  images: { url: string }[];
};

interface ProductGridProps {
  products: ExtendedProduct[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
      {products?.map((product) => (
        <div key={product.id} className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
            ${product.price.toFixed(2)}
          </div>
          <div className="ml-20 mb-4">
            <h3 className="text-2xl font-extrabold tracking-tight line-clamp-1">{product.title}</h3>
            <p className="text-sm text-primary-foreground">{product.category.name}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl || product.images[0]?.url || '/placeholder.jpg'}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 group-hover:scale-110"
              />
              {product.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold transform rotate-12">
                  Featured
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{product.seller.id}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="default" className="w-full justify-start">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 text-4xl font-black text-gray-200 select-none">
            {String(product.id).padStart(3, '0')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;