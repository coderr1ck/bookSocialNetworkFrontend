import React from 'react'
import PaginatedBooksComponent from '../components/PaginatedBooksComponent'

const MyBooksPage = () => {
  return (
    <PaginatedBooksComponent api={"/books/owner"}/>
  )
}

export default MyBooksPage