"use client";
import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SORT_OPTIONS = {
  featured: "Featured",
  discount: "Discount",
  priceLowToHigh: "Price low to high",
  priceHighToLow: "Price high to low",
} as const;

type SortOptionKey = keyof typeof SORT_OPTIONS;

const SearchSortMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState<SortOptionKey | null>(null);

  useEffect(() => {
    const currentSort = searchParams.get("sort") as SortOptionKey;
    if (currentSort && SORT_OPTIONS[currentSort]) {
      setSort(currentSort);
    } else {
      setSort(null);
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (criteria: SortOptionKey) => {
    setSort(criteria);
    router.push(pathname + "?" + createQueryString("sort", criteria));
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-md">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="sm" className="flex gap-2">
            {sort ? SORT_OPTIONS[sort] : "Any"}
            <ArrowDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Object.entries(SORT_OPTIONS).map(([key, label]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleSortChange(key as SortOptionKey)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchSortMenu;
