import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageLayout from '../components/PageLayout'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShieldAlert } from 'lucide-react'

const AppLayout = () => {  
  return (
    <>
    <PageLayout>
      <Navbar/>
       <Outlet/>
      <Footer/>
    </PageLayout>
    </>
  )
}

export default AppLayout