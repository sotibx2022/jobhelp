import { Loading } from '@/app/_components'
import SkeletonBox from '@/app/_components/structures/skleton/SkletonBox'
import SkeletonHeading from '@/app/_components/structures/skleton/SkletonHeading'
import React from 'react'
const loading = () => {
    return (
        <div className='flex flex-col gap-4'>
            {[...Array(8)].map((_,index)=>{
                return <div key={index} className='flexBetween border-b-2 py-4'>
                    <SkeletonHeading className='w-1/2 h-[30px]  px-2'/>
                    <SkeletonBox className='w-[20px] h-[30px]'/>
                </div>
            })}
        </div>
    )
}
export default loading