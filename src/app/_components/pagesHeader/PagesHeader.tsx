import React, { Suspense } from 'react'
import { Loading, SearchBar,Logo, GuestUser } from '../index'
const PagesHeader= () => {
  return (
    <div className='flexBetween w-full'>
      <Logo />
      <Suspense fallback={<Loading/>}>
      <SearchBar  />
      </Suspense>
      <GuestUser/>
    </div>
  )
}
export default PagesHeader