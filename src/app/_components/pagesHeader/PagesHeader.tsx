import React from 'react'
import Logo from '../landingPage/Logo'
import { SearchBar } from '../index'
const PagesHeader= () => {
  return (
    <div className='flexBetween w-full'>
      <Logo />
      <SearchBar  />
    </div>
  )
}
export default PagesHeader