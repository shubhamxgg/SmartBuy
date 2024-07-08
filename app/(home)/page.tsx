import CustomerTestimonal from "@/components/customer-testimonal";
import ItemBlog from "@/components/items/item-blog";
import ItemCarousel from "@/components/items/item-carousel";
import ItemCategory from "@/components/items/item-category";
import ItemFeaturedBuy from "@/components/items/item-featured-buy";
import ItemSection from "@/components/items/item-section";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <ItemCarousel />
      <ItemSection title={"Mobile"} />
      <ItemCategory />
      <ItemSection title={"Fashion"} />
      <ItemSection title={"Electronic"} />
      <ItemSection title={"Mobile"} />
      <ItemFeaturedBuy />
      <ItemBlog />
      <CustomerTestimonal />
    </div>
  );
};

export default HomePage;
