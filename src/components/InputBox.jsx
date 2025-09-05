import React,{useId} from 'react'

const InputBox = ({label,type,name,value,onFocus,onChange,error,style,placeholderTxt,id,accept,checked,disabled,ref}) => {
    const _id = useId();
    // console.log(_id);
  return (
    <>
        <label htmlFor={id ? id :_id}>{label ? label :"Label"}</label>
        <input ref={ref} disabled={disabled} checked={checked} accept={accept} id={id ? id : _id} type={type ? type :`text`} name={name} value={value} onFocus={onFocus} onChange={onChange} placeholder={placeholderTxt} className={`${style} border rounded-sm px-4 py-1 border-black/30 focus:outline-black/35 w-full disabled:bg-gray-200`}/>
        <div className='text-sm text-red-500'>{error && error}</div>
    </>
  )
}

export default InputBox