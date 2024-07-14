import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  { id: '1', name: 'Monthly Sales Report', description: 'Detailed breakdown of sales for the current month' },
  { id: '2', name: 'Product Performance', description: 'Analysis of top-selling and underperforming products' },
  { id: '3', name: 'Customer Acquisition', description: 'Report on new customer sign-ups and retention rates' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Reports</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{report.description}</p>
              <Button>Generate Report</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}