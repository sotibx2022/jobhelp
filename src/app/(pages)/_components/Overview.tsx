"use client"
import { PagesHeader, StringList } from '@/app/_components'
import { config } from '@/app/config/envConfiguration'
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails'
import { addJobDetails } from '@/app/redux/jobdetailsSlice'
import { RootState } from '@/app/redux/store'
import { APIResponse } from '@/app/types/APIResponse'
import { JobBaseDetail } from '@/app/types/jobDetails'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Overview: React.FC<{ jobtitle: string }> = ({ jobtitle }) => {
  const dispatch = useDispatch();
  const jobTitleState = useSelector((state: RootState) => state.jobDetails.jobTitle)
  const urlToFetchJobBaseData = `/api/overview?jobtitle=${jobtitle}`;
  const { data: jobBaseDetails, isPending } = useQuery({
    queryKey: ['jobBaseDetails', jobtitle],
    queryFn: () => getJobDetails<JobBaseDetail>(urlToFetchJobBaseData),
  })
  console.log(jobBaseDetails);
  const { jobTitle, jobDescription, keyResponsibilities } = jobBaseDetails?.data|| {}
  console.log(jobTitle,jobDescription,keyResponsibilities);
  return isPending ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <h1 className="primaryHeading">{jobTitle}</h1>
      <p className="primaryParagraph">{jobDescription}</p>
      <StringList stringArray={keyResponsibilities} />
    </div>
  );
}
export default Overview
