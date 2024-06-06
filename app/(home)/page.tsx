import { Dash } from "@/components/dash";
import { Dashboard } from "@/components/dashboard";
import ItemCard from "@/components/items/item-card";
import ItemCarousel from "@/components/items/item-carousel";
import ItemList from "@/components/items/item-list";

const HomePage = () => {
  return (
    <div className="my-5 w-full px-4">
      {/* <Dashboard /> */}
      {/* <Dash /> */}
      <ItemCarousel />
      <ItemList />
    </div>
  );
};

export default HomePage;
