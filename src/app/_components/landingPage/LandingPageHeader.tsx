import Image from 'next/image'
import React from 'react'
import {Logo,GuestUser} from './../index'
const LandingPageHeader = () => {
  return (
    <div className='flexBetween mt-2 w-full'>
     <Logo/>
     <GuestUser/>
    </div>
  )
}
export default LandingPageHeader