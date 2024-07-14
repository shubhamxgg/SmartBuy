import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sellers = [
  { id: '1', name: 'Seller A', products: 50, sales: '$5000.00', rating: 4.5 },
  { id: '2', name: 'Seller B', products: 30, sales: '$3000.00', rating: 4.2 },
  { id: '3', name: 'Seller C', products: 70, sales: '$7000.00', rating: 4.8 },
];

export default function SellersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Sellers</h2>
      <Card>
        <CardHeader>
          <CardTitle>Seller List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>{seller.id}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.products}</TableCell>
                  <TableCell>{seller.sales}</TableCell>
                  <TableCell>{seller.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}