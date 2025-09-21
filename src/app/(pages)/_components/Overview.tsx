"use client"
import { getJobOverview } from '@/app/functions/queryFunction'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
const Overview:React.FC<{jobtitle:string}> = ({jobtitle}) => {
  const {data:jobBaseDetails,isPending} = useQuery({
      queryKey: ['jobBaseDetails', jobtitle],
          queryFn: () => getJobOverview(jobtitle),
  })
  return (
    <div>
      <h1>{jobBaseDetails?.jobTitle}</h1>
    </div>
  )
}
export default Overview