import { ProductStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const StatusDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={ProductStatus.AVAILABLE}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProductStatus.AVAILABLE}>Available</SelectItem>
              <SelectItem value={ProductStatus.OUT_OF_STOCK}>
                Out of Stock
              </SelectItem>
              <SelectItem value={ProductStatus.DISCONTINUED}>
                Discontinued
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="featured" className="flex items-center space-x-2">
            <Checkbox id="featured" name="featured" />
            <span>Featured</span>
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDetails;