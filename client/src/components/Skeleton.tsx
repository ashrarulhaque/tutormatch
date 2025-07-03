import React from "react";

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`bg-gray-200 rounded-md ${className} animate-pulse`} />;
};

export default Skeleton;