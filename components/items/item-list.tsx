import ItemCard from "./item-card";

const ItemList = () => {
  return (
    <div className="max-w-4xl w-full mx-auto mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ItemCard />
        <ItemCard />
        <ItemCard />

        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};

export default ItemList;
