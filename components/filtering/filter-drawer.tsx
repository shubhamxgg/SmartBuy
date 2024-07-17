'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { FilterIcon, SortAscIcon, Check, DollarSign, Tag, Store, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileFilters({ categories, sellers }: { categories: any[], sellers: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High', icon: DollarSign },
    { value: 'price-desc', label: 'Price: High to Low', icon: DollarSign },
    { value: 'title-asc', label: 'Name: A to Z', icon: SortAscIcon },
    { value: 'title-desc', label: 'Name: Z to A', icon: SortAscIcon },
  ];

  useEffect(() => {
    const minPrice = Number(searchParams.get('minPrice') || 0);
    const maxPrice = Number(searchParams.get('maxPrice') || 1000);
    setPriceRange([minPrice, maxPrice]);
    setSelectedCategory(searchParams.get('categoryId'));
    setSelectedSeller(searchParams.get('sellerId'));
    setSortOption(`${searchParams.get('sortBy') || 'createdAt'}-${searchParams.get('sortOrder') || 'desc'}`);
    setIsFeatured(searchParams.get('featured') === 'true');
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    if (selectedCategory) {
      params.set('categoryId', selectedCategory);
    } else {
      params.delete('categoryId');
    }

    if (selectedSeller) {
      params.set('sellerId', selectedSeller);
    } else {
      params.delete('sellerId');
    }

    if (isFeatured) {
      params.set('featured', 'true');
    } else {
      params.delete('featured');
    }

    router.push(`/search?${params.toString()}`);
  };

  const applySort = () => {
    if (sortOption) {
      const [sortBy, sortOrder] = sortOption.split('-');
      const params = new URLSearchParams(searchParams.toString());
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);
      router.push(`/search?${params.toString()}`);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FilterSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <Card className="mb-4">
      <CardContent className="p-0">
        <Button
          variant="ghost"
          className="w-full justify-between p-4 rounded-t-lg"
          onClick={() => toggleSection(title)}
        >
          <div className="flex items-center">
            <Icon className="h-5 w-5 mr-2 text-primary" />
            <span className="font-semibold">{title}</span>
          </div>
          {expandedSection === title ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        <AnimatePresence>
          {expandedSection === title && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between p-4 bg-background border-t border-border md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="flex-1 mr-2">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh]">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">Filters</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 overflow-y-auto flex-1">
            <FilterSection title="Price Range" icon={DollarSign}>
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
            </FilterSection>

            <FilterSection title="Categories" icon={Tag}>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <motion.div key={category.id} whileTap={{ scale: 0.95 }}>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedCategory === category.id ? "border-primary bg-primary/10" : "hover:border-primary/50"
                      )}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    >
                      <CardContent className="flex items-center justify-center p-2 h-16">
                        <span className="text-sm font-medium text-center">{category.name}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Sellers" icon={Store}>
              <div className="grid grid-cols-2 gap-2">
                {sellers.map((seller) => (
                  <motion.div key={seller.id} whileTap={{ scale: 0.95 }}>
                    <Card
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedSeller === seller.id ? "border-primary bg-primary/10" : "hover:border-primary/50"
                      )}
                      onClick={() => setSelectedSeller(selectedSeller === seller.id ? null : seller.id)}
                    >
                      <CardContent className="flex items-center justify-center p-2 h-16">
                        <span className="text-sm font-medium text-center">{seller.name}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Featured Products" icon={Sparkles}>
              <Button
                variant={isFeatured ? "default" : "outline"}
                className="w-full"
                onClick={() => setIsFeatured(!isFeatured)}
              >
                {isFeatured ? "Featured Products Only" : "Show All Products"}
              </Button>
            </FilterSection>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={applyFilters}>Apply Filters</Button>
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
        <DrawerContent className="h-[60vh]">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">Sort Products</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 gap-2">
              {sortOptions.map((option) => (
                <motion.div key={option.value} whileTap={{ scale: 0.95 }}>
                  <Card
                    className={cn(
                      "cursor-pointer transition-all",
                      sortOption === option.value ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    )}
                    onClick={() => setSortOption(option.value)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <option.icon className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                      {sortOption === option.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={applySort}>Apply Sort</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}