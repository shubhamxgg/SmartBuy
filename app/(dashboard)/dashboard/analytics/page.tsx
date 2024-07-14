import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const salesData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 2200 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 2600 },
];

const visitorData = [
  { name: "Mon", visitors: 500 },
  { name: "Tue", visitors: 600 },
  { name: "Wed", visitors: 750 },
  { name: "Thu", visitors: 800 },
  { name: "Fri", visitors: 900 },
  { name: "Sat", visitors: 1000 },
  { name: "Sun", visitors: 850 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Analytics</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitor Traffic</CardTitle>
            </CardHeader>
          <CardContent>
            {/* <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}