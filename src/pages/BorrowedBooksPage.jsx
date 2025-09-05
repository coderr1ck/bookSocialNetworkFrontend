import React from 'react'
import PaginatedBooksComponent from '../components/PaginatedBooksComponent'

const BorrowedBooksPage = () => {
  return (
    <PaginatedBooksComponent api={"/books/borrowed"}/>
  )
}

export default BorrowedBooksPage