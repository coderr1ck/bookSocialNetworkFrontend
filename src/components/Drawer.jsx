import React from 'react'
import { useDrawer } from '../context/DrawerContex'
import Button from './Button';
import { IoHomeOutline } from "react-icons/io5";
import { Book, BookCheck, BookDown, BookPlus, UserRoundPen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import ReactDOM from 'react-dom'

const Drawer = () => {
    const {logout} = useAuth();
    const {isOpen,toggleDrawer} = useDrawer();
  return ReactDOM.createPortal(
    <>
    {/* // this is drawer backdrop component */}
    {isOpen && <div className="fixed inset-0 bg-black/20 " onClick={toggleDrawer}>
    </div>}
    {/* this is drawer that always remains in your screen and just transitions from left to right */}
    <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col w-full h-full justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={toggleDrawer}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className='flex flex-col gap-4 pt-4 flex-1 text-md'>
            <Link to={"/"} className="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 px-2 rounded">
              <IoHomeOutline size={24}/> 
              <div>Home</div>
            </Link>
            <Link to={"/books/owner"} className="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 px-2 rounded">
              <Book/>
              <div>My Books</div>
            </Link>
            <Link to={"/books/borrowed"} className="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 px-2 rounded">
              <BookDown/>
              <div>Borrowed Books</div>
            </Link>
            <Link to={"/books/returned"} className="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 px-2 rounded">
              <BookCheck/>
              <div>Returned Books</div>
            </Link>
            <Link to={"/books/create"} className="flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 px-2 rounded">
              <BookPlus/>
              <div>Add New Book</div>
            </Link>           

          </div>
          <Button text={"Logout"} style={"w-7/8 self-center"} onClick={logout}></Button>
        </div>
    </div>
    </>
  ,document.getElementById("drawer"));
}

export default Drawer