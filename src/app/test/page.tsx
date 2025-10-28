"use client"
import React from 'react'
import ShareProfileInfo from '../(dashboard)/profile/ShareProfileInfo'
import ShareButton from '../_components/structures/ShareButton'
const page = () => {
  const handleClick=()=>{
  }
  return (
    <div>
      <ShareProfileInfo/>
      <ShareButton onClick={handleClick}/>
    </div>
  )
}
export default page