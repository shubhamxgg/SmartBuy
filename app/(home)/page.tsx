"use client";
import CustomerTestimonal from "@/components/customer-testimonal";
import ItemBlog from "@/components/items/item-blog";
import ItemCarousel from "@/components/items/item-carousel";
import ItemCategory from "@/components/items/item-category";
import ItemFeaturedBuy from "@/components/items/item-featured-buy";
import ItemSection from "@/components/items/item-section";
import useProductStore from "@/store/useProducts";

const HomePage = () => {
  const { products, isLoading, filterProductsByCategory } = useProductStore();
  const da = filterProductsByCategory("Clothing");

  return (
    <div className="flex flex-col p-5">
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
