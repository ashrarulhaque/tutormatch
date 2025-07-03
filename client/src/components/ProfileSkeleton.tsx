import Skeleton from './Skeleton';

const TeacherProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          <Skeleton className="h-32 w-32 rounded-full md:h-40 md:w-40" />

          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-6 w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:text-right space-y-3">
            <Skeleton className="h-6 w-24" />
            <div className="flex space-x-2 justify-end">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileSkeleton;
