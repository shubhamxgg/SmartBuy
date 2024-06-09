import ItemCard from "./item-card";
import ItemList from "./item-list";

interface ItemSectonProps {
  title: string;
}

const ItemSection = ({ title }: ItemSectonProps) => {
  return (
    <div className="max-w-6xl flex flex-col px-2 pb-5">
      <div className="flex items-center justify-between px-2 py-4 border">
        <h1>{title}</h1>
        <span>View all product</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 w-full p-3 gap-2 border">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};

export default ItemSection;
