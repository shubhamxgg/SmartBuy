"use client";

import { useEffect, useState } from "react";
import { CarouselCard } from "./carousel-card";
import { CarouselControls } from "./carousel-controls";

interface CarouselItem {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

export function CarouselList({ items }: { items: CarouselItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [items]);

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex((prevIndex) => (newIndex + items.length) % items.length);
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <CarouselCard key={item.id} item={item} />
        ))}
      </div>
      <CarouselControls
        currentIndex={currentIndex}
        totalItems={items.length}
        onIndexChange={handleIndexChange}
      />
    </>
  );
}
