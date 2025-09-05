import React, { useEffect ,useState} from 'react'
import BookCard from '../components/BookCard'
import Pagination from '../components/Pagination';
import FullScreenLoader from '../components/FullScreenLoader';
import booksApi from '../utils/api';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import {BookAlert} from 'lucide-react'

const PaginatedBooksComponent = ({api}) => {
  const [books,setBooks] = useState(null);
  const [totalPages,setTotalPages] = useState(null);
  const [currPage,setCurrPage] = useState(0);
  const [loading,setLoading] = useState(false);
  const toggleLoading = ()=>setLoading(prev=>!prev);
  const fetchBooks = async()=>{
    try{
     toggleLoading();
     const res = await booksApi.get(`${api}`, {
      params: {
        size: 4,
        page:`${currPage}`
      }
    }); 

     if(res?.status === 200){
      setBooks(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
      setCurrPage(res?.data?.number); 
     }
    //  console.log(res);
    }catch(err){
      console.log(err);
    }finally{
      toggleLoading();
    }
  }

  useEffect(()=>{
    fetchBooks();
  },[currPage])

  
  if(!books || books === null ||loading){
    // console.log(books === null);
    return <FullScreenLoader loading={books===null || loading}/>
  }

  return (
    <>
    {(Array.isArray(books) && books.length > 0) ?
    <section className='flex flex-1 flex-col items-center p-10'>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 m-auto">
        {books.map((book) => (
            <Link key={book?.id} to={book ? `/books/${book?.id}` :"/"}><BookCard key={book?.id} book={book} /></Link>
        ))}
        </div>
        {(totalPages && totalPages>=2) && <Pagination totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage}/>}
    </section> : 
        <section className='flex flex-1 items-center justify-center flex-col gap-12'>
            <BookAlert size={72}/>
            <div className='text-4xl'>No Books Found </div>
        </section>}
    </>
    )
}

export default PaginatedBooksComponent