import Skeleton from "../common/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <Skeleton className="h-14 w-80" />

      {/* Goal */}

      <Skeleton className="h-48 w-full rounded-3xl" />

      {/* Executive Summary */}

      <Skeleton className="h-40 w-full rounded-3xl" />

      {/* Grid */}

      <div className="grid grid-cols-12 gap-8">
        <Skeleton className="col-span-8 h-96 rounded-3xl" />

        <Skeleton className="col-span-4 h-96 rounded-3xl" />

        <Skeleton className="col-span-8 h-[500px] rounded-3xl" />

        <Skeleton className="col-span-4 h-[500px] rounded-3xl" />

        <Skeleton className="col-span-8 h-80 rounded-3xl" />

        <Skeleton className="col-span-4 h-80 rounded-3xl" />
      </div>
    </div>
  );
}
