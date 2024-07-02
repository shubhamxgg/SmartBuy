"use client";
import { SearchIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import useProductStore from "@/store/useProducts";

const Searchbar = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="flex gap-2">
      <div className="hidden sm:flex relative w-auto gap-2">
        <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          className="w-full pl-8 md:w-[400px] lg:w-[400px]"
          placeholder="Search product..."
          onChange={handleSearchChange}
          value={search}
        />
        {search && (
          <X
            className="h-4 w-4 absolute right-3 top-3 text-muted-foreground"
            onClick={clearSearch}
          />
        )}
      </div>
      <div className="ml-auto">
        <Link href={"/search"}>
          <Button variant={"outline"} size={"icon"}>
            <SearchIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Searchbar;
