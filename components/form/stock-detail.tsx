import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface StockDetailsProps {
  sku: string;
  setSku: React.Dispatch<React.SetStateAction<string>>;
  quantity: number | "";
  setQuantity: React.Dispatch<React.SetStateAction<number | "">>;
  lowStockThreshold: number | "";
  setLowStockThreshold: React.Dispatch<React.SetStateAction<number | "">>;
}

const StockDetail = ({
  sku,
  setSku,
  quantity,
  setQuantity,
  lowStockThreshold,
  setLowStockThreshold,
}: StockDetailsProps) => {
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
            placeholder="Stock Keeping Unit"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            placeholder="Quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value ? parseInt(e.target.value) : "")
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
          <Input
            id="low-stock-threshold"
            placeholder="Low Stock Threshold"
            type="number"
            value={lowStockThreshold}
            onChange={(e) =>
              setLowStockThreshold(
                e.target.value ? parseInt(e.target.value) : ""
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StockDetail;
