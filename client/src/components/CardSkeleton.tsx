import React from 'react';

const shimmer = 'animate-pulse bg-gray-200 dark:bg-gray-700';

const TeacherCardSkeleton: React.FC = () => {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-start space-x-4">
        <div className={`h-20 w-20 rounded-full ${shimmer}`} />

        <div className="flex-1 space-y-2">
          <div className={`h-5 w-1/2 rounded ${shimmer}`} />
          <div className="flex items-center space-x-2">
            <div className={`h-4 w-4 rounded ${shimmer}`} />
            <div className={`h-4 w-12 rounded ${shimmer}`} />
            <div className={`h-4 w-20 rounded ${shimmer}`} />
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-4 w-4 rounded ${shimmer}`} />
            <div className={`h-4 w-20 rounded ${shimmer}`} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className={`h-6 w-16 rounded-full ${shimmer}`} />
        <div className={`h-6 w-16 rounded-full ${shimmer}`} />
        <div className={`h-6 w-16 rounded-full ${shimmer}`} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className={`h-6 w-20 rounded-full ${shimmer}`} />
          <div className={`h-6 w-24 rounded-full ${shimmer}`} />
        </div>
        <div className="text-right space-y-1">
          <div className={`h-6 w-12 rounded ${shimmer}`} />
          <div className={`h-4 w-10 rounded ${shimmer}`} />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div className={`h-10 w-[48%] rounded-md ${shimmer}`} />
        <div className={`h-10 w-[48%] rounded-md ${shimmer}`} />
      </div>
    </div>
  );
};

export default TeacherCardSkeleton;
