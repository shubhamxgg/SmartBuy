import { ProductStatus } from "@prisma/client";
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
import { Checkbox } from "../ui/checkbox";

interface StatusDetailsProps {
  status: ProductStatus;
  setStatus: React.Dispatch<React.SetStateAction<ProductStatus>>;
  featured: boolean;
  setFeatured: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusDetails = ({
  featured,
  setFeatured,
  status,
  setStatus,
}: StatusDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as ProductStatus)}
          >
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
          <Label htmlFor="featured">Featured</Label>
          {/* <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="checkbox"
          /> */}
          <Checkbox checked={featured} onCheckedChange={() => setFeatured} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDetails;
