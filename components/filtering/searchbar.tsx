"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('q') || '');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (search.trim()) {
        params.set('q', search.trim());
      } else {
        params.delete('q');
      }
      router.push(`/products?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    setSearch("");
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete('q');
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="w-full pl-10 pr-20"
      />
      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      {search && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-14 top-1/2 transform -translate-y-1/2"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <Button 
        type="submit"
        disabled={isPending}
        className="absolute right-0 top-0 bottom-0 rounded-l-none"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
        <span className="ml-2 hidden sm:inline">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;