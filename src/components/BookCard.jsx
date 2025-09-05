import React from 'react'
import { FaBook,FaUser,FaStar } from "react-icons/fa";
import { BookAlert } from 'lucide-react';

const BookCard = ({book}) => {
  return (
    <div className='flex flex-col max-w-72 bg-white shadow-lg rounded-2xl'>
        {book?.cover ? <img src={ book?.cover ? `data:image/*;base64,${book?.cover}` :''} className='w-full object-cover aspect-5/6 rounded-t-2xl'></img> :
        <div className='flex flex-col gap-4 items-center justify-center w-full object-cover aspect-5/6 rounded-t-2xl bg-gradient-to-br from-gray-300 to-gray-400 min-w-60'>
          <BookAlert size={48} className='opacity-50'/>
          <h1 className='text-xl font-medium opacity-60'>No Cover</h1>
        </div>}
        
        
        <div className='p-4 flex justify-evenly flex-col gap-2'>
        <div className='flex felx-row gap-2 items-center'>
            <FaBook className='text-blue-500'/>
            <div>{book?.title}</div>      
        </div>
        
        <div className='flex felx-row gap-2 items-center'>
            <FaUser className='text-green-600'/>
            <div className='col-span-5'>{book?.owner}</div>
        </div>

        <div className='flex felx-row gap-2 items-center'>
            <FaStar className='text-yellow-500'/>
            <div className='col-span-5'>{book?.rate}/5</div>        
        </div>

        </div>
    </div>
  )
}

export default BookCard