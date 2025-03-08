import React from "react";

const WishlistSkeleton = () => {
  return (
    <div className="flex items-center bg-gray-200 p-4 rounded-lg animate-pulse shadow">
      <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
      <div className="ml-4 flex-1">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default WishlistSkeleton;
