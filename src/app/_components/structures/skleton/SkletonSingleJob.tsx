import React from 'react'
import SkeletonHeading from './SkletonHeading'
import { Card } from '@/components/ui/card'
import SkletonBox from './SkletonBox'
const SkletonSingleJob = () => {
  return (
    <Card className='w-full'>
      <div className="flex gap-2 items-center w-full p-2">
        <SkletonBox className='w-12 h-12' />
      <div className="cardRight flex flex-col gap-2 w-full">
        <SkeletonHeading className='w-full h-8' />
        <div className="flex gap-2">
          <SkeletonHeading className='w-4 h-4' />
          <SkeletonHeading className='w-24 h-4' />
        </div>
      </div>
      </div>
    </Card>
  )
}
export default SkletonSingleJob