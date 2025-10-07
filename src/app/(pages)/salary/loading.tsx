import SkeletonCard from '@/app/_components/structures/skleton/SkletonCard'
import React from 'react'
const loading = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className="top flexBetween flex-col sm:flex-row">
        <SkeletonCard className='w-[30vw] h-[60vh]'/>
        <SkeletonCard className='w-[30vw] h-[60vh]'/>
      </div>
      <div className="bottom">
        <SkeletonCard className='w-full h-[30vh]'/>
      </div>
    </div>
  )
}
export default loading