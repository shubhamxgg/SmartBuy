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
import { Card, CardContent } from "./ui/card";
import { QuoteIcon } from "lucide-react";

interface Testimonial {
  name: string;
  image: string;
  text: string;
  position: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    image: "/images/users/user.jpg",
    text: "This product has revolutionized my workflow. The intuitive interface and powerful features have significantly boosted my productivity.",
    position: "Software Engineer"
  },
  {
    name: "Jane Smith",
    image: "/images/users/user.jpg",
    text: "Exceptional quality and outstanding customer service. I'm impressed by the attention to detail and the team's responsiveness to feedback.",
    position: "UX Designer"
  },
  {
    name: "Mike Johnson",
    image: "/images/users/user.jpg",
    text: "I can't recommend this product enough. It's been a game-changer for our team, streamlining our processes and improving collaboration.",
    position: "Project Manager"
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
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-card bg-opacity-60 rounded-xl">
        <div className="w-full md:w-1/3 flex items-center justify-center">
          <Skeleton className="h-16 w-3/4" />
        </div>
        <div className="w-full md:w-2/3">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-card bg-opacity-60 rounded-xl border mt-5">
      <div className="w-full md:w-1/3 flex items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight">
          What Our Customers Say
        </h2>
      </div>
      <div className="w-full md:w-2/3">
        <CustomerTestimonialCarousel />
      </div>
    </div>
  );
};

const CustomerTestimonialCarousel = () => {
  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <TestimonialCard testimonial={testimonial} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card className="bg-card  shadow-sm rounded-xl overflow-hidden">
    <CardContent className="p-6">
      <QuoteIcon className="text-primary w-12 h-12 mb-4 opacity-20" />
      <p className="text-muted-foreground mb-4 italic">{testimonial.text}</p>
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            alt={testimonial.name}
            src={testimonial.image}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CustomerTestimonial;