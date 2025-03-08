import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-[400px] animate-pulse">
    <div className="w-full h-60 sm:h-72 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
  )
}

export default ProductCardSkeleton;
// function SkeletonCard() {
//     return (
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-[400px] animate-pulse">
//         <div className="w-full h-60 sm:h-72 bg-gray-300"></div>
//         <div className="p-4">
//           <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
//           <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//         </div>
//       </div>
//     );
//   }
  
//   export default SkeletonCard;
  
