import React from 'react'

const EmptyMessage = ({title, message}) => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex justify-center mt-4">
            <img src="/images/empty.png" alt="Empty State" className="w-[128px] h-[128px] object-cover" />
        </div>
    </div>
  )
}

export default EmptyMessage