import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const customers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: '$500.00' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: '$300.00' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 7, totalSpent: '$750.00' },
];

export default function CustomersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Customers</h2>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}