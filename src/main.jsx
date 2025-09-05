import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRouter from './routes/AppRouter.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <>
    <AppRouter/>
    <ToastContainer/>
    </>
  // </StrictMode>,
)
