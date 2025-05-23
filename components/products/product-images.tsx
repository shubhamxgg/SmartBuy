import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImagesProps {
  product: any;
}

const ProductImages = ({ product }: ProductImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [
    product.imageUrl,
    ...(product.images?.map((img: any) => img.url) || []),
  ];
  console.log(product);
  console.log(allImages);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col bg-card p-6 rounded-xl border border-border">
      <div className="relative w-full aspect-square mb-4">
        <Image
          alt={product.title}
          src={allImages[currentImageIndex]}
          layout="fill"
          objectFit="contain"
          loading="lazy"
          className="rounded-lg overflow-hidden bg-white"
          placeholder="blur"
          blurDataURL={allImages[currentImageIndex]}
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto py-2">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
              index === currentImageIndex ? "border-primary" : "border-border"
            }`}
          >
            <Image
              alt={`Product image ${index + 1}`}
              src={img}
              width={80}
              height={80}
              objectFit="cover"
              loading="lazy"
              className="rounded-sm overflow-hidden"
            />
          </button>
        ))}
        {allImages.length === 0 && (
          <div className="w-20 h-20 flex items-center justify-center rounded-md border border-border bg-background text-muted-foreground text-sm">
            No Image
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImages;
