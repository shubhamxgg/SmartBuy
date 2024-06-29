import useProductStore from "@/store/useProducts";
import ItemCard from "./item-card";
import ItemList from "./item-list";
import { Loader } from "lucide-react";
import ItemSectionSkeleton from "./item-section-skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "@/lib/actions/get-product-by-categories";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col pb-5 w-full">
      <div className="flex items-center justify-between px-2 py-4 border rounded-sm border-white/20 bg-card">
        <h1 className="px-5 font-bold text-xl">{title}</h1>
        {/* <span className="px-5 font-bold text-md cursor-pointer">View all product</span> */}
        <Button
        className=""
        variant={"outline"}
          onClick={() => {
            router.push(`/search?categories=${title}`);
          }}
        >
          View All Product
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full p-3 gap-4 border flex-1 mt-2 rounded-sm">
        {categoryData[0]?.products?.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemSection;
