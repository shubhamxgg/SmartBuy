import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const OrderDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="rounded-t-lg">
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
            </div>
          </div>
          <div className="mt-6">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">
                    <Skeleton className="h-4 w-full" />
                  </th>
                  <th className="border p-2">
                    <Skeleton className="h-4 w-full" />
                  </th>
                  <th className="border p-2">
                    <Skeleton className="h-4 w-full" />
                  </th>
                  <th className="border p-2">
                    <Skeleton className="h-4 w-full" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="border p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                    <td className="border p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                    <td className="border p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                    <td className="border p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsSkeleton;
