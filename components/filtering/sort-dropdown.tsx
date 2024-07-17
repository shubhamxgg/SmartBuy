'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '../ui/separator';

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const [sortBy, sortOrder] = value.split('-');
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    router.push(`/search?${params.toString()}`);
  };

  const currentSort = `${searchParams.get('sortBy') || 'createdAt'}-${searchParams.get('sortOrder') || 'desc'}`;

  return (
    <Select value={currentSort} onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          <Separator className="my-2"/>
          <SelectItem value="createdAt-desc">Newest</SelectItem>
          <SelectItem value="createdAt-asc">Oldest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="title-asc">Name: A to Z</SelectItem>
          <SelectItem value="title-desc">Name: Z to A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}