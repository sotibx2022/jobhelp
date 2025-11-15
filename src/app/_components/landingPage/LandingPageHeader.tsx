import Image from 'next/image'
import React from 'react'
import {Logo} from './../index'
import UserDisplay from './UserDisplay/UserDisplay'
const LandingPageHeader = () => {
  return (
    <div className="mt-2 w-full flex  flex-col md:flex-row md:justify-between items-center">
  <div className="flex justify-start">
    <Logo />
  </div>
  <div className="flex justify-end mt-2">
    <UserDisplay />
  </div>
</div>
  )
}
export default LandingPageHeader