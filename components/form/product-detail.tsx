import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ProductDetailsProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  price: number | "";
  setPrice: React.Dispatch<React.SetStateAction<number | "">>;
}

const ProductDetails = ({
  name,
  price,
  description,
  setDescription,
  setName,
  setPrice,
}: ProductDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? parseFloat(e.target.value) : "")
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
