import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const ItemBlog = () => {
  return (
    <div className="py-10">
      <div className="border rounded-sm">
        <div className="p-2 border-b flex justify-between items-center">
          <h1>Blog Posts</h1>
          <Link href={""}>
            <Button variant={"outline"}>View all</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3">
          <ItemBlogCard
            title="asdssdasddas"
            description="asdsdddsdsa"
            image="/user.jpg"
          />
          <ItemBlogCard
            title="asdssdasddas"
            description="asdsdddsdsa"
            image="/user.jpg"
          />
          <ItemBlogCard
            title="asdssdasddas"
            description="asdsdddsdsa"
            image="/user.jpg"
          />
        </div>
      </div>
    </div>
  );
};

interface ItemBlogCardProps {
  title: string;
  description: string;
  image: string;
}

const ItemBlogCard = ({ title, image, description }: ItemBlogCardProps) => {
  return (
    <div className="p-2 w-full flex flex-col gap-2 border">
      <Image
        src={image}
        alt="l"
        width={100}
        height={100}
        className="w-full border border-red-50 aspect-square object-cover rounded-sm"
      />
      <h2>{description}</h2>
      <p>{title}</p>
    </div>
  );
};

export default ItemBlog;
