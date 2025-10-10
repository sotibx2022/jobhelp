import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import SkeletonHeading from './SkletonHeading'
import SkeletonBox from './SkletonBox'
const SkletonCountryLoading = () => {
  return (
    <div>
        <Card>
            <CardHeader>
            <SkeletonHeading className='w-[150px] h-[30px]'/>
            <SkeletonHeading className='w-[300px] h-[20px]'/>
            </CardHeader>
            <CardContent>
                <SkeletonHeading className='w-[300px] h-[20px] mb-2'/>
                <SkeletonBox className='w-full h-[40px]'/>
            </CardContent>
        </Card>
    </div>
  )
}
export default SkletonCountryLoading