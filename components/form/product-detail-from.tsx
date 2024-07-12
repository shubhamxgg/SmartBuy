import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const ProductDetails = () => {
  return (
    <Card className="max-w-4xl mx-auto shadow-lg rounded-xl bg-white overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6">
        <CardTitle className="text-3xl font-bold">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="p-8 grid lg:grid-cols-2 gap-6">
        <div className="grid gap-4">
          <Label htmlFor="name" className="text-lg font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            className="border border-gray-300 rounded-lg p-3 text-base focus:border-teal-500 focus:ring focus:ring-teal-200 transition duration-200"
            placeholder="Product Name"
            required
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="price" className="text-lg font-medium text-gray-700">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            className="border border-gray-300 rounded-lg p-3 text-base focus:border-teal-500 focus:ring focus:ring-teal-200 transition duration-200"
            placeholder="Price"
            type="number"
            required
            step="0.01"
            min="0"
          />
        </div>
        <div className="grid gap-4 lg:col-span-2">
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="border border-gray-300 rounded-lg p-3 text-base focus:border-teal-500 focus:ring focus:ring-teal-200 transition duration-200"
            placeholder="Product Description"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;