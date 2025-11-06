"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
const page = () => {
  return (
    <div className='flexCenter w-full h-[100vh] gap-4'>
      <Button>shadcn button</Button>
      <button className='roundedExtra bg-red-500 p-4 text-white'>plain button</button>
    </div>
  )
}
export default page