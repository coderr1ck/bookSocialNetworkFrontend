import React, { useState } from 'react'
import { useDrawer } from '../context/DrawerContex'
import { Menu } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Navbar = ({}) => {
  const {toggleDrawer} = useDrawer();
  const {isLoggedIn,setIsLoggedIn,user,authLoading} = useAuth();
  const navigate = useNavigate();
  return (
            <nav className=' w-full h-14 bg-white flex flex-row items-center justify-between px-12 shadow-md '>
                <Menu onClick={toggleDrawer} className='cursor-pointer ' size={28}/>
                <div className='md:text-xl font-semibold text-center flex-1'>Book Social Network</div>
                <div className='flex md:min-w-48 flex-row justify-end gap-4 text-xl'>
                {(isLoggedIn && user && !authLoading) && <><div className='hidden md:block'>{user?.email}</div><CircleUser size={28}/></>}
                {(!isLoggedIn && !authLoading) && <Button text={"Log In"} style={"px-4 text-sm md:text-xl"} onClick={()=>navigate("/login")} />}
                </div>
            </nav>
  )
}

export default Navbar