import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateToText } from "@/lib/utils";

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
      <div className="flex items-start justify-between w-full">
        <div className="w-24 h-24 relative">
          <Image
            src={order.image}
            alt={`Order ${order.id}`}
            width={96}
            height={96}
            quality={80}
            // placeholder="blur"
            // blurDataURL={order.imagePlaceholder}
            className="rounded-sm"
          />
        </div>
        <div>
          <p className="text-sm md:text-lg  text-muted-foreground">
            Ordered Placed: {formatDateToText(order.createdAt)}
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            Total: ${order.totalAmount.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Status: {order.status}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
));

OrderCard.displayName = "OrderCard";

export default OrderCard;
