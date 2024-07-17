import { getFeaturedItem } from "@/lib/api/products";
import { CarouselList } from "../carousel/carousel-list";

export default async function ProductCarousel() {
  const data = await getFeaturedItem();

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg my-5">
      <CarouselList items={data} />
    </div>
  );
}