import React from 'react'

const ProfileSkeleton = () => {
  return (
  <div className="mx-4 my-10 p-7  bg-white rounded-lg shadow animate-pulse ">
  <div className="flex items-center space-x-6">
    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
    <div className="flex-1">
      <div className="w-48 h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-36 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-48 h-6 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-60 h-6 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-40 h-6 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-36 h-6 bg-gray-200 rounded"></div>
    </div>
  </div>

  <div className="flex space-x-4 mt-6">
    <div className="w-24 h-10 bg-gray-300 rounded-lg"></div>
    <div className="w-40 h-10 bg-gray-300 rounded-lg"></div>
  </div>
</div>
  )
}

export default ProfileSkeleton
