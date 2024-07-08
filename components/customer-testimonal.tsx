'use client'
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
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 rounded-lg p-4 flex items-center justify-center border">
          <Skeleton className="h-12 w-3/4" />
        </div>
        <div className="w-full md:w-1/2 rounded-lg border">
          <div className="max-w-sm mx-auto p-4 relative ">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 bg-card rounded-lg p-4 flex items-center justify-center border">
        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Customer Testimonials
        </h2>
      </div>
      <div className="w-full md:w-1/2 bg-card border rounded-lg">
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
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
                  <Image
                    alt={testimonial.name}
                    src={testimonial.image}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold">{testimonial.name}</p>
                <p className="mt-2 text-gray-600 text-center">
                  {testimonial.text}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
          <Button size="default" variant="outline">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
          <Button size="default" variant="outline">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CustomerTestimonial;
