"use client";
import ItemCard from "./item-card";
import ItemSectionSkeleton from "./item-section-skeleton";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getProductByCategory } from "@/lib/actions/category";

interface ItemSectonProps {
  title: string;
}

const ItemSection = ({ title }: ItemSectonProps) => {
  const router = useRouter();
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category", title],
    queryFn: async () => await getProductByCategory({ categoryName: title }),
    refetchOnMount: false,
  });
  if (!categoryData) {
    return null;
  }

  if (isLoading) {
    return <ItemSectionSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-1 pb-5 w-full ">
      <div className="flex items-center justify-between px-2 py-4 border rounded-sm bg-card">
        <h1 className="px-5 font-bold text-xl">{title}</h1>

        <Button
          variant={"outline"}
          onClick={() => {
            router.push(`/search?categories=${title}`);
          }}
        >
          View All Product
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 flex-1 mt-2 rounded-sm">
        {categoryData[0]?.products?.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemSection;
