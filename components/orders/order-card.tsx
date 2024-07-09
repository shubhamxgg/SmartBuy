import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
  order: any;
}

const OrderCard = memo(({ order }: OrderCardProps) => (
  <Card>
    <CardHeader className="flex flex-row justify-between items-center w-full">
      <div className="text-primary text-xl">Order #{order.id}</div>
      <Button variant="link" className="text-primary">
        <Link href={`/orders/${order.id}`}>View Order Details</Link>
      </Button>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 relative">
            <Image
              src={order.image}
              alt={`Order ${order.id}`}
              width={96}
              height={96}
              quality={80}
              // placeholder="blur"
              // blurDataURL={order.imagePlaceholder}
            />
          </div>
          <div>
            <p className="text-lg text-muted-foreground">
              Ordered Placed: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-md text-muted-foreground">
              Total: ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Status: {order.status}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
));

OrderCard.displayName = "OrderCard";

export default OrderCard;
