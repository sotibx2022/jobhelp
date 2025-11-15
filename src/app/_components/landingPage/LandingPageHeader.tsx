import Image from 'next/image'
import React from 'react'
import {Logo} from './../index'
import UserDisplay from './UserDisplay/UserDisplay'
const LandingPageHeader = () => {
  return (
    <div className="mt-2 w-full flex  flex-col-reverse md:flex-row">
  {/* First row: Logo left */}
  <div className="flex justify-start">
    <Logo />
  </div>
  {/* Second row: UserDisplay right */}
  <div className="flex justify-end mt-2">
    <UserDisplay />
  </div>
</div>
  )
}
export default LandingPageHeader