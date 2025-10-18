import Image from 'next/image'
import React from 'react'
import {Logo} from './../index'
import UserDisplay from './UserDisplay/UserDisplay'
const LandingPageHeader = () => {
  return (
    <div className='flexBetween mt-2 w-full'>
     <Logo/>
     <UserDisplay/>
    </div>
  )
}
export default LandingPageHeader