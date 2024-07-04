import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/actions/category";

const ItemCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="pb-5 pt-2 flex flex-col md:flex-row w-full gap-2">
        <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0 rounded-sm">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5 pt-2 flex flex-col md:flex-row w-full gap-2">
      <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0 rounded-sm bg-card">
        <h1>{"Shop by category"}</h1>
      </div>
      <div className="flex gap-2 overflow-x-auto scroll-auto snap-x snap-proximity">
        {data?.map((item) => (
          <ItemCategoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

interface ItemCategoryCardProps {
  item: {
    id: number;
    name: string;
  };
}

const ItemCategoryCard = ({ item }: ItemCategoryCardProps) => {
  const router = useRouter();
  return (
    <div className="flex-shrink-0 w-72 border rounded-sm hover:shadow-lg transition-shadow duration-200 bg-card snap-center snap-always cursor-pointer">
      <div className="p-5">
        <Image
          height={200}
          width={200}
          src={"/clothing.jpg"}
          alt="image-card"
          className="object-cover border border-red-100 aspect-square w-full overflow-hidden rounded-sm"
        />
      </div>

      <div className="flex items-center justify-center pb-4">
        <Button
          className="flex items-center justify-center font-bold md:px-5 text-lg px-10"
          onClick={() => {
            router.push(`/search?categories=${item.name}`);
          }}
          variant={"secondary"}
        >
          {item.name}
        </Button>
      </div>
    </div>
  );
};

export default ItemCategory;
