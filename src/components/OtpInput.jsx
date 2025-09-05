import React from 'react'

const OtpInput = ({inputCode,inputBoxRef,handleKeyDown,onChangeHandler}) => {
  return (
    <div className='flex flex-row gap-3'>
            {inputCode.map((code,idx)=>{
                return <input key={idx} ref={(e)=>{inputBoxRef.current[idx]=e}} onKeyDown={(e)=>handleKeyDown(e,idx)} value={inputCode[idx]} className='border-1 size-16 rounded-md text-center focus:outline-black/60 placeholder:text-black/50 text-4xl bg-gray-50 border-black/50' placeholder={'0'} onChange={(e)=>onChangeHandler(e,idx)}/>
            })}
    </div>
  )
}

export default OtpInput