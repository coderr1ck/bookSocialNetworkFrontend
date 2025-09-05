import React,{useState} from 'react'
import FullScreenLoader from './FullScreenLoader';
import { useDrawer } from '../context/DrawerContex';
import Drawer from './Drawer';

const PageLayout = ({children}) => {
    if(!children){
        return null;
    }
    return (
    <div className='flex-1 bg-black/4 flex flex-col items-center min-h-screen h-full w-full '>
        {children}
    </div>
  )
}

export default PageLayout