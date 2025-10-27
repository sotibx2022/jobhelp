import SkeletonHeading from '@/app/_components/structures/skleton/SkletonHeading'
import SkletonProgressCard from '@/app/_components/structures/skleton/SkletonProgressCard'
import React from 'react'
const ProfileSkleton = () => {
  return (
    <div className='container'>
        <SkeletonHeading className='w-[250px] h-[30px] bg-muted/60 my-4'/>
        {Array.from({ length: 5 }).map((_,index) => {
  return <SkletonProgressCard key={index} />;
})}
    </div>
  )
}
export default ProfileSkleton