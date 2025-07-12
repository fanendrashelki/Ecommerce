import React from 'react'

const NotFound = ({title}) => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <img
            src="https://www.svgrepo.com/show/87468/empty-box.svg"
            alt="No Banners"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <h2 className="text-xl font-semibold">{`No ${title}  Found`}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {`Please check back later or add a new ${title}.`}
          </p>
        </div>
  )
}

export default NotFound
