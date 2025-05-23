import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import useCategories from "@/hooks/use-categories";

interface Category {
  id: number;
  name: string;
}

const CategoryDetails = () => {
  const { categories, isLoading, error, } = useCategories();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category">
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link href={"/create-category"}>
          <Button variant={"outline"} className="w-full">
            Create New Category
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryDetails;
