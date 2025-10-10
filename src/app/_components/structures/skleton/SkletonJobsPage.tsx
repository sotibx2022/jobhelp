import React from 'react'
import SkletonCountryLoading from './SkletonCountryLoading'
import { Badge } from '@/components/ui/badge'
import SkeletonBox from './SkletonBox'
import SkletonSingleJob from './SkletonSingleJob'
const SkletonJobsPage = () => {
  return (
    <div>
        <SkletonCountryLoading/>
        <div className="flexBetween flex-wrap gap-2 my-2">
              {[...Array(4)].map((_,index)=>{
                return <Badge variant="outline" className="flex items-center space-x-1" key={index}>
                <SkeletonBox className="w-8 h-6" />
                <SkeletonBox className="w-24 h-6" />
              </Badge>
              })}
              <div className="flex flex-col w-full">
                {[...Array(8)].map((_,index)=>{
                return <SkletonSingleJob key={index}/>
              })}
              </div>
               </div>
    </div>
  )
}
export default SkletonJobsPage