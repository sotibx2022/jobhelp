import React, { Suspense } from 'react'
import { Loading, SearchBar, Logo } from '../index'
import UserDisplay from '../landingPage/UserDisplay/UserDisplay'
const PagesHeader = () => {
  return (
    <div className='flexBetween w-full'>
      <Logo />
      <Suspense fallback={<Loading />}>
        <SearchBar />
      </Suspense>
      <UserDisplay />
    </div>
  )
}
export default PagesHeader