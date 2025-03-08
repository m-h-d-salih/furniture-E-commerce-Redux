import React from "react";

const CartSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row bg-gray-200 shadow-lg rounded-lg p-4 sm:p-6">
      <div className="w-full sm:w-40 h-40 bg-gray-300 rounded-lg"></div>
      <div className="flex-1 p-4 sm:p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
