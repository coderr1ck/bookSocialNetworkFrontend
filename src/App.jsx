import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DrawerProvider } from './context/DrawerContex'
import Drawer from './components/Drawer'
import AuthContextProvider from './context/AuthContext'
import AppLayout from './pages/AppLayout'
import PopupComponent from './components/PopupComponent'

function App() {
  return (
    <>
        <AuthContextProvider>
          <DrawerProvider>
            <Drawer/>
            <AppLayout/> 
          </DrawerProvider>
        </AuthContextProvider>
    </>
  )
}

export default App
