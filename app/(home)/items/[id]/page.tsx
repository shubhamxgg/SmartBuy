"use client";
import ItemSection from "@/components/items/item-section";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";

interface ItemPageProps {
  params: {
    id: number;
  };
}

const ItemsPage = ({ params: { id } }: ItemPageProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="hidden sm:block p-5 ">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col lg:flex-row p-2 md:p-5">
        <div className="w-full lg:w-1/2 flex flex-col border bg-card p-5 rounded-sm">
          <div className="w-full border rounded-sm max-w-xl mx-auto">
            <Image
              alt="item_image"
              src={"/user.jpg"}
              height={500}
              width={300}
              className="w-full max-h-[500px] h-[100%]  object-cover rounded-sm border shadow-lg"
            />
          </div>
          <div className="border flex gap-2 mt-2 p-2 rounded-sm">
            <Image
              alt="item_image"
              src={"/user.jpg"}
              height={100}
              width={100}
              className="border rounded-sm"
            />
            <Image
              alt="item_image"
              src={"/user.jpg"}
              height={100}
              width={100}
              className="border rounded-sm"
            />
          </div>
        </div>
        <div className="w-full p-4 lg:w-1/2 mt-3 flex flex-col lg:ml-4 bg-card rounded-sm lg:mt-0 border">
          <div className="bg-green-500 w-[110px] p-2 rounded-md mb-4 mt-2">
            Buy 2 Get 2
          </div>
          <h3 className="font-semibold text-lg mb-2">Google Pixel 8</h3>
          <h1 className="font-semibold text-md mt-2">$700</h1>
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-sm">Select qunatity</p>
            <Button variant={"default"} size={"default"}>
              +
            </Button>
          </div>

          <div className="flex flex-col p-4 mt-5 border bg-card rounded-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm lg-text-base">Free Delivery</h4>
              <p className="text-sm lg-text-base">Details</p>
            </div>
            <div className="mt-4 flex gap-2">
              Get <p className="text-red-500">SAMPLE</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border mt-2 rounded-sm">
            <h1>Secure</h1>
            <h1>Statifaction</h1>
            <h1>Privacy</h1>
          </div>

          <div className="flex items-center gap-2 w-full mt-4 py-4">
            <Button className="w-full">Add to cart</Button>
            <Button className="w-full">Buy now</Button>
          </div>

          <div className="py-2 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            <p className="underline underline-offset-3">Wishlist</p>
          </div>

          <h1 className="mt-10 mb-2 font-semibold text-lg">Product Details</h1>
          <p className="w-full text-balance leading-relaxed overflow-hidden">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </p>
        </div>
      </div>

      {/* <ItemSection title="Electronic" /> */}

      <div className="py-5 md:py-10 flex flex-col lg:flex-row gap-5 p-2 md:p-4  rounded-sm">
        <div className="lg:w-1/3 w-full bg-card p-5 rounded-sm">
          <h1 className="mb-2 font-bold">Customer Ratings</h1>
          <div className="mb-4">⭐️</div>
          <div className="mb-2">0 customer rating</div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <div>5 Stars</div>
              <div>-</div>
              <div>0%</div>
            </div>
            <div className="flex gap-2 w-full">
              <div>4 Stars</div>
              <div>-</div>
              <div>0%</div>
            </div>
            <div className="flex gap-2 w-full">
              <div>3 Stars</div>
              <div>-</div>
              <div>0%</div>
            </div>
            <div className="flex gap-2">
              <div>2 Stars</div>
              <div>-</div>
              <div>0%</div>
            </div>
            <div className="flex gap-2 w-full">
              <div>1 Stars</div>
              <div>-</div>
              <div>0%</div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 w-full bg-card p-5 rounded-sm">
          <h1 className="font-bold text-lg mb-4">No Review</h1>
          <div className=" flex flex-col items-center justify-center w-full">
            <h1>Be the the first to review this product</h1>
            <Button className="my-4">Write a review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
