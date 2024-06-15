import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
interface Category {
  id: number;
  name: string;
}
interface CategoryDetailsProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  subcategory: string;
  setSubcategory: React.Dispatch<React.SetStateAction<string>>;
  categories: Category[];
}
const CategoryDetails = ({
  category,
  setCategory,
  setSubcategory,
  subcategory,
  categories,
}: CategoryDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            defaultValue="select"
            value={category}
            onValueChange={setCategory}
          >
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
        {/* <div className="grid gap-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select
            defaultValue="select"
            value={subcategory}
            onValueChange={setSubcategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phones">Phones</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="tvs">TVs</SelectItem>
              <SelectItem value="shirts">Shirts</SelectItem>
              <SelectItem value="pants">Pants</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <Link href={"/create-category"}>
          <Button variant={"outline"}>Create New Category</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryDetails;
