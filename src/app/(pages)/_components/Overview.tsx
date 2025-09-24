"use client"
import { PagesHeader, StringList } from '@/app/_components'
import { getJobOverview } from '@/app/functions/queryFunction'
import { addJobDetails } from '@/app/redux/jobdetailsSlice'
import { RootState } from '@/app/redux/store'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Overview: React.FC<{ jobtitle: string }> = ({ jobtitle }) => {
  const dispatch = useDispatch();
  const jobTitleState = useSelector((state: RootState) => state.jobDetails.jobTitle)
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
