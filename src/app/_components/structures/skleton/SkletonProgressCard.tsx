import React from 'react'
import SkeletonHeading from './SkletonHeading'
import SkletonBox from './SkletonBox'
const SkletonProgressCard = () => {
  return (
    <div className='h-[100px] bg-card p-4 border-2 flex flex-col justify-between mb-4 roundedExtra'>
    <div className="flexBetween">
      <div className="flex items-center gap-4">
        <SkeletonHeading className='h-[25px] w-[200px] '/>
      <SkletonBox className='h-[25px] w-[25px] bg-destructive'/>
    </div>
    <div className="progressActions flex">
      <SkletonBox className='h-[25px] w-[25px] bg-muted/60 border-secondary'/>
      <SkletonBox className='h-[25px] w-[25px] bg-muted/60 border-secondary'/>
    </div>
    </div>
    <SkletonBox className='w-full h-[10px] rounded-full'/>
    </div>
  )
}
export default SkletonProgressCard