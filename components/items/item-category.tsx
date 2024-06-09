import Image from "next/image";

const ItemCategory = () => {
  return (
    <div className="max-w-6xl px-2 pb-5 pt-2 flex flex-col md:flex-row mx-auto">
      <div className="flex items-center justify-center py-2 border-[2px] flex-1 md:font-bold md:text-4xl md:px-6 md:py-0">
        <h1>{"Shop by category"}</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2">
        <ItemCategoryCard image="/user.jpg" title="Clothing" />
        <ItemCategoryCard image="/user.jpg" title="Phone" />
      </div>
    </div>
  );
};

interface ItemCategoryCardProps {
  title: string;
  image: string;
}

const ItemCategoryCard = ({ image, title }: ItemCategoryCardProps) => {
  return (
    <div className="w-full border">
     <div className="p-5">
     <Image
        height={200}
        width={200}
        src={image}
        alt="image-card"
        className="object-cover border border-red-100 aspect-square w-full overflow-hidden"
      />
     </div>
      <h1 className="flex items-center justify-center pb-4 font-bold md:px-5">{title}</h1>
    </div>
  );
};

export default ItemCategory;
