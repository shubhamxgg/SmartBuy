"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <div className="border rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
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
      <div className="bg-card rounded-lg shadow-md overflow-hidden border">
        <div className="p-4 flex justify-between items-center bg-card mb-2">
          <h1 className="text-2xl font-semibold">Blog Posts</h1>
          <Link href="/blog">
            <Button variant="outline">View all</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
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
    <Card className=" bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 line-clamp-3">{description}</p>
        <Button variant="outline" className="mt-2 self-start">
          Read More
        </Button>
      </div>
    </Card>
  );
};

export default ItemBlog;
