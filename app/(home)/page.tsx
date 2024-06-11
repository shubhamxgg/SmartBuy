"use client";
import CustomerTestimonal from "@/components/customer-testimonal";
import ItemBlog from "@/components/items/item-blog";
import ItemCarousel from "@/components/items/item-carousel";
import ItemCategory from "@/components/items/item-category";
import ItemFeaturedBuy from "@/components/items/item-featured-buy";
import ItemSection from "@/components/items/item-section";
import useProductStore from "@/lib/store/use-products";

const HomePage = () => {
  const { products, isLoading, filterProductsByCategory } = useProductStore();
  const da = filterProductsByCategory("Clothing");
  console.log(products, da);

  return (
    <div className="w-full px-5 py-5 sm:px-2 mx-auto max-w-6xl">
      <ItemCarousel />
      <ItemSection title={"Electronic"} />
      <ItemCategory />
      <ItemSection title={"Clothing"} />
      <ItemSection title={"Home Appliance"} />
      <ItemSection title={"Gaming"} />
      <ItemFeaturedBuy />
      <ItemBlog />
      <CustomerTestimonal />
    </div>
  );
};

export default HomePage;
