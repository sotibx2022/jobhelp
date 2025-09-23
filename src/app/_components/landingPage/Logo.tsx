import Image from 'next/image'
import React from 'react'
import logoImage from '../../../../public/jobriselogo.png'
import Link from 'next/link'
Image
const logo = () => {
  return (
    <div>
      <Link href='/'>
        <Image src={logoImage} alt='jobrise logo' height={50} />
      </Link>
    </div>
  )
}
export default logo