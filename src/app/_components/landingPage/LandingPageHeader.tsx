import Image from 'next/image'
import React from 'react'
import logoImage from '../../../../public/jobriselogo.png'
const LandingPageHeader = () => {
  return (
    <div>
      <Image src={logoImage} alt='jobrise logo'  height={50} />
    </div>
  )
}
export default LandingPageHeader