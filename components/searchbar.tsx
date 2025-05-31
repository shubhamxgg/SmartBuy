"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./filtering/product-list";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [debounceValue, setDebounceValue] = useState(search);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (search.trim() !== "") {
        params.set("query", search.trim());
      } else {
        params.delete("search");
      }
      router.push(`/search?${params.toString()}`);
      setShowDropdown(false);
    });
  };

  const clearSearch = () => {
    setSearch("");
    setShowDropdown(false);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete("query");
      router.push(`/search?${params.toString()}`);
    });
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", debounceValue],
    queryFn: () => fetchProducts({ query: debounceValue }),
    staleTime: 1000 * 60 * 5,
    enabled: debounceValue.trim() !== "",
  });

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full pl-10 pr-24 h-12 rounded-full shadow-sm focus:ring-2 focus:ring-primary"
        />
        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-16 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
            onClick={clearSearch}
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-4 rounded-full bg-primary hover:bg-primary/90"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Search</span>
            </>
          )}
        </Button>

        {showDropdown && debounceValue.length > 0 && (
          <div className="absolute top-full h-[400px] w-full rounded-xl bg-background/90 backdrop-blur-xl shadow-sm overflow-hidden border">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">
                Failed to load results.
              </div>
            ) : !data || !data.products || data.products.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No results found.
              </div>
            ) : (
              data.products.map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => {
                    router.push(`/product/${product.id}`);
                    setShowDropdown(false);
                  }}
                >
                  <SearchIcon className="h-4 w-4" />
                  <p>{product.title}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
