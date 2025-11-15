import Image from 'next/image'
import React from 'react'
import {Logo} from './../index'
import UserDisplay from './UserDisplay/UserDisplay'
const LandingPageHeader = () => {
  return (
    <div className='mt-2 w-full flex flex-col md:flex-row md:flexBetween'>
     <Logo/>
     <UserDisplay/>
    </div>
  )
}
export default LandingPageHeader