import React, { Suspense } from 'react'
import { Loading, SearchBar, Logo } from '../index'
import UserDisplay from '../landingPage/UserDisplay/UserDisplay'
const PagesHeader = () => {
  return (
    <div className='w-full flex flex-col  sm:flex sm:flex-row justify-between items-center'>
      <Logo />
      <Suspense fallback={<Loading />}>
        <SearchBar />
      </Suspense>
      <UserDisplay />
    </div>
  )
}
export default PagesHeader