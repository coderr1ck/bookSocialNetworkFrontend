import React from 'react'
import FullScreenLoader from '../components/FullScreenLoader';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {   
 const {isLoggedIn,authLoading} = useAuth();
    // console.log("loggedIN",isLoggedIn,"auth loading",authLoading);
    if(authLoading){
      // console.log("auth loading laoder");
        return <FullScreenLoader loading={authLoading}/>
    } 
  return (
    <>
     {(!authLoading && isLoggedIn) ? <Outlet/> : 
        <div className='flex flex-1 flex-col items-center justify-center  gap-12'>
        <ShieldAlert size={172}/>  
        <div className='text-2xl md:text-4xl'>Please Login to Continue ...</div>
     </div>}
    </>
  )
}

export default ProtectedRoute