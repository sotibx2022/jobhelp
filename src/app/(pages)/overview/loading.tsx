import { Loading } from '@/app/_components'
import SkeletonHeading from '@/app/_components/structures/skleton/SkletonHeading'
import SkeletonLists from '@/app/_components/structures/skleton/SkletonLists'
import React from 'react'
const loading = () => {
  return (
    <div>
        <SkeletonHeading className='bg-muted/60 h-12 w-full max-w-[500px] my-4'/>
        <SkeletonLists listLength={10} className='w-full primaryParagraph' />
    </div>
  )
}
export default loading