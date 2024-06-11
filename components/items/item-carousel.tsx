import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem as BaseCarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

const data = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    name: "Cozy Knit Sweater",
    description: "Soft and warm knit sweater perfect for the winter season.",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
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
  return (
    <div className="py-2 md:px-6 relative pb-10">
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-colors absolute left-[50%] sm:left-[70%] md:left-5 lg:-left-10">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 " />
        </CarouselPrevious>
        <CarouselNext className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-colors right-12 top-2/4 sm:right-18 md:right-5 lg:-right-10">
          <ArrowRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </CarouselNext> */}
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
        {/* <div className="flex flex-col justify-center gap-4">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700 dark:text-gray-200">
              Featured
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{item.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {item.description}
            </p>
          </div>
          <div className="flex gap-2 justify-between md:justify-center">
            <Button>Add to Cart</Button>
            <Button variant="outline">View Product</Button>
          </div>
        </div> */}
      </div>
    </BaseCarouselItem>
  );
};
