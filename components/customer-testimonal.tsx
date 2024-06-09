import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CustomerTestimonal = () => {
  return (
    <div className="p-5 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center px-5 border p-2">
        <p className="text-xl md:text-5xl  text-center">Customer Testimonials</p>
      </div>
      <div className="w-full md:w-1/2 border">
        <CustomerTestimonalCarousel />
      </div>
    </div>
  );
};

const CustomerTestimonalCarousel = () => {
  return (
    <div className="max-w-sm mx-auto p-4">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image
              alt="i"
              height={300}
              width={300}
              src={"/user.jpg"}
              className="w-full aspect-square object-cover border border-red-50"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CustomerTestimonal;
