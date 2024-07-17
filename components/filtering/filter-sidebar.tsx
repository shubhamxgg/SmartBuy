"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category, Seller } from "@prisma/client";
import { SearchParams } from "@/lib/schemas";
import { useMemo, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterSidebarProps = {
  categories: Category[];
  sellers: any;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export default function FilterSidebar({
  categories,
  sellers,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 1000),
  ]);

  const updateFilter = useCallback(
    (updates: Partial<SearchParams>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });
      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const debouncedUpdateFilter = useMemo(
    () => debounce(updateFilter, 300),
    [updateFilter]
  );

  const handleResetFilters = () => {
    router.push("/search");
  };

  const handlePriceChange = useCallback(
    (value: number[]) => {
      setPriceRange(value);
      debouncedUpdateFilter({
        minPrice: value[0],
        maxPrice: value[1],
      });
    },
    [debouncedUpdateFilter]
  );

  useEffect(() => {
    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(searchParams.get("maxPrice") || 1000);
    setPriceRange([minPrice, maxPrice]);
  }, [searchParams]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (searchParams.get("categoryId")) filters.push("Category");
    if (searchParams.get("sellerId")) filters.push("Seller");
    if (searchParams.get("minPrice") || searchParams.get("maxPrice"))
      filters.push("Price");
    if (searchParams.get("status")) filters.push("Status");
    if (searchParams.get("featured") === "true") filters.push("Featured");
    return filters;
  }, [searchParams]);

  return (
    <div className="w-80 flex-shrink-0 p-6 space-y-6 bg-gradient-to-br from-background to-background/80 rounded-xl shadow-lg border border-primary/10 h-full mr-8 scroll-smooth scrollbar-hide">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Filters
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFilters}
          className="text-primary hover:bg-primary/10"
        >
          <X className="w-4 h-4 mr-1" /> Clear All
        </Button>
      </div>

      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap gap-2"
          >
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="bg-primary/10 text-primary"
              >
                {filter}
              </Badge>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Separator className="bg-primary/20" />

      <div className="space-y-4">
        <h3 className="font-semibold text-sm mb-2">Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className={cn(
                "justify-start transition-all duration-200",
                searchParams.get("categoryId") === category.id.toString()
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              )}
              onClick={() => updateFilter({ categoryId: category.id })}
            >
              {category.name}
              {searchParams.get("categoryId") === category.id.toString() && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-primary/20" />

      <div className="space-y-4">
        <h3 className="font-semibold text-sm mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-4"
        />
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              handlePriceChange([Number(e.target.value), priceRange[1]])
            }
            className="w-24"
          />
          <span>to</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-24"
          />
        </div>
      </div>

      <Separator className="bg-primary/20" />

      <div className="space-y-4">
        <h3 className="font-semibold text-sm mb-2">Seller</h3>
        <div className="grid grid-cols-2 gap-2">
          {sellers.map((seller: any) => (
            <Button
              key={seller.id}
              variant="outline"
              size="sm"
              className={cn(
                "justify-start transition-all duration-200",
                searchParams.get("sellerId") === seller.id.toString()
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              )}
              onClick={() => updateFilter({ sellerId: seller.id })}
            >
              {seller.id}
              {searchParams.get("sellerId") === seller.id.toString() && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-primary/20" />

      <div className="space-y-4">
        <h3 className="font-semibold text-sm mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          {["AVAILABLE", "OUT_OF_STOCK", "DISCONTINUED"].map((status) => (
            <Button
              key={status}
              variant={
                searchParams.get("status") === status ? "default" : "outline"
              }
              size="sm"
              onClick={() =>
                updateFilter({
                  status: status as
                    | "AVAILABLE"
                    | "OUT_OF_STOCK"
                    | "DISCONTINUED",
                })
              }
              className="transition-all duration-200"
            >
              {status.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-primary/20" />

      <Button
        variant="outline"
        size="sm"
        className={cn(
          "w-full justify-start transition-all duration-200",
          searchParams.get("featured") === "true"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-primary/10"
        )}
        onClick={() =>
          updateFilter({
            featured: searchParams.get("featured") === "true" ? false : true,
          })
        }
      >
        <Star className="w-4 h-4 mr-2" />
        Featured Products Only
        {searchParams.get("featured") === "true" && (
          <Check className="w-4 h-4 ml-auto" />
        )}
      </Button>
    </div>
  );
}
