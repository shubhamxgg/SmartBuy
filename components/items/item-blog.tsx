import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const blogPosts = [
  {
    title: "Exploring the Future of AI",
    description:
      "An in-depth look at the advancements in artificial intelligence and what the future holds.",
    image: "/user.jpg",
  },
  {
    title: "Sustainable Living Tips",
    description:
      "Learn how to live a more sustainable and eco-friendly lifestyle with these simple tips.",
    image: "/user.jpg",
  },
  {
    title: "Top Travel Destinations for 2024",
    description:
      "Discover the top travel destinations to add to your bucket list for the coming year.",
    image: "/user.jpg",
  },
];

const ItemBlog = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <div className="border rounded-sm">
          <div className="p-2 border-b flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 p-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="rounded-sm shadow-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-card mb-2">
          <h1 className="text-2xl font-semibold">Blog Posts</h1>
          <Link href="/blog">
            <Button variant="outline">View all</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <ItemBlogCard
              key={index}
              title={post.title}
              description={post.description}
              image={post.image}
            />
          ))}
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
    <div className="p-4 w-full flex flex-col gap-2 border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 bg-card">
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ItemBlog;
