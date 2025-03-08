import React from "react";

function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((index) => (
        <div key={index} className="animate-pulse bg-gray-200 p-4 rounded-lg shadow">
          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-16 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default OrderSkeleton;
