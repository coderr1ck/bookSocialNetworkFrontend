import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from '../components/Button'
import { CircleXIcon } from 'lucide-react';

const PopupComponent = ({visible,setVisible,component}) => {
  return ReactDOM.createPortal(
    <div onClick={()=>setVisible(false)} className={`fixed inset-0 bg-black/50 ${visible ? "flex items-center justify-center" :"hidden"}`}>
        <div onClick={(e)=>e.stopPropagation()} className='bg-white min-w-80 h-fit w-fit rounded-2xl shadow-2xl '>
            <div className='flex justify-end '><Button text={<CircleXIcon/>} onClick={()=>setVisible(false)} style={"!bg-white !border-none !rounded-2xl hover:text-red-700"}/></div>
            <div className='flex flex-row justify-center w-full '>{component ? component : <div>Drawer Body</div>}</div>
            <div className='h-10'></div>
        </div>
    </div>
  ,document.getElementById("popup"));
}

export default PopupComponent