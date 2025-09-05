import React from 'react'

const Button = ({text,style,onClick,type,disabled}) => {
  return (
    <button disabled={disabled} onClick={onClick} type={type ? type :"button"} className={`disabled:opacity-60 flex justify-center items-center p-2 border-1 border-blue-300 rounded-md bg-blue-300 font-semibold hover:opacity-75 cursor-pointer ${style} `}>
        {text && text}
        {text===null && "Default Text"}
    </button>
  )
}

export default Button