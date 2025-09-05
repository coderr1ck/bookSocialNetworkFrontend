import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import booksApi from '../utils/api';
import AddNewBookPage from './AddNewBookPage';

const EditBookPage = () => {
    const {bookId}  = useParams();
    const [book , setBook] = useState(null);

    const fetchBookData = async()=>{
        const res = await booksApi.get( `/books/${bookId}`);
        // console.log(res?.data);
        setBook(res?.data);
    }

    useEffect(()=>{
     fetchBookData();
    },[bookId])

    console.log(book);
  return (
    <AddNewBookPage data={book} text={"Update Book"} api={`/books/${bookId}`}/>
  )
}

export default EditBookPage