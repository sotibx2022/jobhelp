"use client"
import StringList from '@/app/_components/lists/StringList'
import { getJobOverview } from '@/app/functions/queryFunction'
import { useQuery } from '@tanstack/react-query'
import { CheckCheckIcon } from 'lucide-react'
import React from 'react'
const Overview: React.FC<{ jobtitle: string }> = ({ jobtitle }) => {
  const { data: jobBaseDetails, isPending } = useQuery({
    queryKey: ['jobBaseDetails', jobtitle],
    queryFn: () => getJobOverview(jobtitle),
  })
  return (
    <div>
      <h1 className='primaryHeading'>{jobBaseDetails?.jobTitle}</h1>
      <p className='primaryParagraph'>{jobBaseDetails?.jobDescription}</p>
      <StringList stringArray={jobBaseDetails?.keyResponsibilities} />
    </div>
  )
}
export default Overview