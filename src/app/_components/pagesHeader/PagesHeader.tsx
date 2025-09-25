import React, { Suspense } from 'react'
import Logo from '../landingPage/Logo'
import { Loading, SearchBar } from '../index'
const PagesHeader= () => {
  return (
    <div className='flexBetween w-full'>
      <Logo />
      <Suspense fallback={<Loading/>}>
      <SearchBar  />
      </Suspense>
    </div>
  )
}
export default PagesHeader