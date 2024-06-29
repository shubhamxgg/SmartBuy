import { useState, useEffect } from "react";
import Image from "next/image";

import { Skeleton } from "./ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const testimonials = [
  {
    name: "John Doe",
    image: "/user.jpg",
    text: "This product has changed my life for the better!",
  },
  {
    name: "Jane Smith",
    image: "/user.jpg",
    text: "Excellent quality and fantastic customer service.",
  },
  {
    name: "Mike Johnson",
    image: "/user.jpg",
    text: "I would highly recommend this to everyone.",
  },
];

const CustomerTestimonial = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2 flex items-center justify-center px-5 border rounded-sm p-2">
          <Skeleton className="h-12 w-3/4" />
        </div>
        <div className="w-full md:w-1/2 border rounded-sm">
          <div className="max-w-sm mx-auto p-4 relative">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-full md:w-1/2 flex items-center justify-center px-5 border rounded-sm p-2 bg-card">
        <p className="text-xl md:text-5xl text-center">Customer Testimonials</p>
      </div>
      <div className="w-full md:w-1/2 border rounded-sm bg-card">
        <CustomerTestimonialCarousel />
      </div>
    </div>
  );
};

const CustomerTestimonialCarousel = () => {
  return (
    <div className="max-w-sm mx-auto p-4 relative">
      <Carousel>
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center">
                <Image
                  alt={testimonial.name}
                  height={300}
                  width={300}
                  src={testimonial.image}
                  className="w-full aspect-square object-cover border border-red-50 rounded-sm"
                />
                <p className="mt-2 text-lg font-semibold">{testimonial.name}</p>
                <p className="mt-1 text-center">{testimonial.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-50" />
        <CarouselNext className="z-50" />
      </Carousel>
    </div>
  );
};

export default CustomerTestimonial;
