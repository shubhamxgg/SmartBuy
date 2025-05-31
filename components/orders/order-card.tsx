import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { formatDateToText } from "@/lib/utils";
import { ChevronRight, Package } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderCardProps {
  order: any;
}

const OrderCard = memo(({ order }: OrderCardProps) => (
  <Link href={`/orders/${order.id}`}>
    <Card className="overflow-hidden">
      <motion.div
        className="h-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
            <div className="absolute inset-1 rounded-md overflow-hidden">
              {/* <Image
                src={order.image}
                alt={`Order ${order.id}`}
                layout="fill"
                objectFit="contain"
              /> */}
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {/* {formatDateToText(order.createdAt)} */}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold">${order.totalAmount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              {order.items?.length} items
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-secondary px-4 py-3 flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Package className="w-4 h-4 mr-2" />
            {getStatusMessage(order.shippingStatus)}
          </div>
          <ChevronRight className="w-5 h-5" />
        </CardFooter>
      </motion.div>
    </Card>
  </Link>
));

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "processing":
      return "default";
    case "shipped":
      return "secondary";
    case "delivered":
      return "outline";
    default:
      return "destructive";
  }
}

function getStatusMessage(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "Order is being prepared";
    case "shipped":
      return "Package is on its way";
    case "delivered":
      return "Successfully delivered";
    default:
      return "Status unknown";
  }
}

OrderCard.displayName = "OrderCard";

export default OrderCard;
