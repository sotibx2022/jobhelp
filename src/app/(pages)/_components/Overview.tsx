"use client"
import StringList from '@/app/_components/lists/StringList'
import { getJobOverview } from '@/app/functions/queryFunction'
import { addJobDetails } from '@/app/redux/jobdetailsSlice'
import { RootState } from '@/app/redux/store'
import { useQuery } from '@tanstack/react-query'
import { CheckCheckIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Overview: React.FC<{ jobtitle: string }> = ({ jobtitle }) => {
  const jobTitleState = useSelector((state:RootState)=>state.jobDetails.jobTitle)
  const dispatch = useDispatch()
  const { data: jobBaseDetails, isPending } = useQuery({
    queryKey: ['jobBaseDetails', jobtitle],
    queryFn: () => getJobOverview(jobtitle),
  })
 useEffect(() => {
  console.log("Job title received as prop:", jobtitle);
  dispatch(addJobDetails({ jobTitle: jobtitle }));
  console.log("jobTitleState before update (useSelector):", jobTitleState);
  // If you want to see the updated state after dispatch,
  // you need another useEffect watching the state:
}, []);
// Optional: watch Redux state changes
useEffect(() => {
  console.log("Redux jobTitle state updated:", jobTitleState);
}, [jobTitleState]);
  return (
    <div>
      <h1 className='primaryHeading'>{jobBaseDetails?.jobTitle}</h1>
      <p className='primaryParagraph'>{jobBaseDetails?.jobDescription}</p>
      <StringList stringArray={jobBaseDetails?.keyResponsibilities} />
    </div>
  )
}
export default Overview