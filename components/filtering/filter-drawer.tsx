'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterIcon, SortAscIcon, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MobileFilters({ categories, sellers }: { categories: any[], sellers: any[] }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between p-4 bg-background border-t border-border md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="flex-1 mr-2">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 overflow-y-auto flex-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedCategory === category.id ? "border-primary" : "hover:border-primary/50"
                      )}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="flex items-center justify-center p-2 h-20">
                        <span className="text-sm font-medium text-center">{category.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sellers</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sellers.map((seller) => (
                    <Card
                      key={seller.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedSeller === seller.id ? "border-primary" : "hover:border-primary/50"
                      )}
                      onClick={() => setSelectedSeller(seller.id)}
                    >
                      <CardContent className="flex items-center justify-center p-2 h-20">
                        <span className="text-sm font-medium text-center">{seller.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Apply Filters</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="flex-1 ml-2">
            <SortAscIcon className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[40vh]">
          <DrawerHeader>
            <DrawerTitle>Sort Products</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 gap-2">
              {sortOptions.map((option) => (
                <Card
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-all",
                    sortOption === option.value ? "border-primary" : "hover:border-primary/50"
                  )}
                  onClick={() => setSortOption(option.value)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="text-sm font-medium">{option.label}</span>
                    {sortOption === option.value && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}