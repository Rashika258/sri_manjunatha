import { Skeleton } from "@/components/ui/index";

const AppTableSkeleton = () => {
  return (
    <div className="w-full p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="py-3 px-4">
              <Skeleton className="w-16 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-32 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-24 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-48 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-24 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-16 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-24 h-4" />
            </th>
            <th className="py-3 px-4">
              <Skeleton className="w-24 h-4" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <tr key={idx}>
                <td className="py-3 px-4">
                  <Skeleton className="w-16 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-32 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-24 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-48 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-24 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-16 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-24 h-4" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="w-24 h-4" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTableSkeleton;
