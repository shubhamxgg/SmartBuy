import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const StockDetail = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            placeholder="Stock Keeping Unit"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            type="number"
            min="0"
            step="1"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
          <Input
            id="lowStockThreshold"
            name="lowStockThreshold"
            placeholder="Low Stock Threshold"
            type="number"
            min="0"
            step="1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StockDetail;