import React from 'react'
import Logo from '../landingPage/Logo'
import SearchBar from '../landingPage/SearchBar'
const PagesHeader = () => {
  return (
    <div className='flexBetween w-full'>
      <Logo/>
      <SearchBar/>
    </div>
  )
}
export default PagesHeader