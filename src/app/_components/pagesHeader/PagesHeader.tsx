import React, { Suspense } from 'react'
import { Loading, SearchBar, Logo } from '../index'
import UserDisplay from '../landingPage/UserDisplay/UserDisplay'
const PagesHeader = () => {
  return (
    <div className='w-full flex-col gap-2 items-center md:flex-row md:justify-between my-2'>
      <Logo />
      <Suspense fallback={<Loading />}>
        <SearchBar />
      </Suspense>
      <UserDisplay />
    </div>
  )
}
export default PagesHeader