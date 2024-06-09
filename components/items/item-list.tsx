import ItemCard from "./item-card";

const ItemList = () => {
  return (
    <div className="sm:max-w-4xl w-full mx-auto mt-12">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
