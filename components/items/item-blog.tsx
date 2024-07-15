"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "The Rise of AI in E-commerce",
    description:
      "Explore how artificial intelligence is revolutionizing online shopping experiences and personalization.",
    date: "2023-12-15",
    category: "AI & E-commerce",
  },
  {
    title: "5G and the Future of Online Retail",
    description:
      "Discover how 5G technology is set to transform mobile shopping and augmented reality experiences in e-commerce.",
    date: "2023-12-10",
    category: "Tech Trends",
  },
  {
    title: "Blockchain in Supply Chain Management",
    description:
      "Learn how blockchain technology is enhancing transparency and efficiency in e-commerce supply chains.",
    date: "2023-12-05",
    category: "Blockchain",
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
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 p-6">
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
        <div className="p-6 flex justify-between items-center border-b mb-4">
          <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
          <Link href="/blog">
            <Button variant="outline" className="hover:bg-accent">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {blogPosts.map((post, index) => (
            <ItemBlogCard
              key={index}
              title={post.title}
              description={post.description}
              date={post.date}
              category={post.category}
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
  date: string;
  category: string;
}

const ItemBlogCard = ({ title, description, date, category }: ItemBlogCardProps) => {
  return (
    <Card className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105 transform">
      <div className="p-6 flex flex-col gap-3 h-full">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            {new Date(date).toLocaleDateString()}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground line-clamp-3 flex-grow">{description}</p>
        <Button variant="link" className="mt-4 self-start p-0">
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ItemBlog;