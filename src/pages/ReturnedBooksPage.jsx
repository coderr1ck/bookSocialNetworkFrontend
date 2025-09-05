import React from 'react'
import PaginatedBooksComponent from '../components/PaginatedBooksComponent'

const ReturnedBooksPage = () => {
  return (
    <PaginatedBooksComponent api={"/books/returned"}/>
  )
}

export default ReturnedBooksPage