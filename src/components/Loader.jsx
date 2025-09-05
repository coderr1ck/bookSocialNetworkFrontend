import React from 'react'

const Loader = ({style,type}) => {
  if(type && type === "small"){
    return <div className='size-[28px] border-white border-4 border-t-transparent animate-spin rounded-full'></div>
  }
  return (
        <div className={`${style} size-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin`}></div>
  )
}

export default Loader