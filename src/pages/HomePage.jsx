import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageLayout from '../components/PageLayout'
import PaginatedBooksComponent from '../components/PaginatedBooksComponent'

const HomePage = () => {  
  return (
      <PaginatedBooksComponent api={"/books"}/>
  )
}

export default HomePage