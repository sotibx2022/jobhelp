import SkeletonBox from '@/app/_components/structures/skleton/SkletonBox'
import SkletonBox from '@/app/_components/structures/skleton/SkletonBox'
import SkeletonHeading from '@/app/_components/structures/skleton/SkletonHeading'
import React from 'react'
const SkletonRoadmapPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='h-[100px] bg-card p-4 border-2 flex flex-col justify-between mb-4'>
    <div className="flexBetween">
      <div className="flex items-center gap-4">
        <SkeletonHeading className='h-[25px] w-[200px] '/>
      <SkletonBox className='h-[25px] w-[25px] bg-destructive'/>
    </div>
    <SkletonBox className='h-[25px] w-[50px] bg-primary'/>
    </div>
    <SkletonBox className='w-full h-[10px] rounded-full'/>
    </div>
   <div className='flex flex-col gap-4'>
            {[...Array(8)].map((_,index)=>{
                return <div key={index} className='flexBetween border py-4 px-2'>
                    <SkeletonHeading className='w-1/2 h-[30px]  px-2'/>
                    <SkeletonBox className='w-[20px] h-[30px]'/>
                </div>
            })}
        </div>
    </div>
  )
}
export default SkletonRoadmapPage