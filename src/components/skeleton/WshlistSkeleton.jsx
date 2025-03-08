import React from 'react'

const WshlistSkeleton = () => {
  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow animate-pulse">
      <div className="w-16 h-16 bg-gray-300 rounded-md" />
      <div className="ml-4 flex-1">
        <div className="h-4 bg-gray-300 w-24 mb-2 rounded"></div>
        <div className="h-3 bg-gray-300 w-16 rounded"></div>
      </div>
      <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
    </div>
  )
}

export default WshlistSkeleton
