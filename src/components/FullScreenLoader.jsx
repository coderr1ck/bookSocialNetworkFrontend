import React from 'react'

const FullScreenLoader = ({loading}) => {
  return (
    <div className='flex-1 h-full w-full flex items-center justify-center'>
        {loading && <div className='size-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin'></div>}
    </div>
  )
}

export default FullScreenLoader