import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orders = [
  { id: '1', customer: 'John Doe', date: '2023-06-01', status: 'Completed', total: '$120.00' },
  { id: '2', customer: 'Jane Smith', date: '2023-06-02', status: 'Processing', total: '$85.50' },
  { id: '3', customer: 'Bob Johnson', date: '2023-06-03', status: 'Shipped', total: '$200.75' },
];

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Orders</h2>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}