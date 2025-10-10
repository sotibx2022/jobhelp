'use client'  // Client Component
import React, { useEffect, useMemo, useState } from 'react'
import { SelectableCountries } from '../_components'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Navigation } from '@/app/_components'
import Link from 'next/link'
import SingleJob from './SingleJob'
import JobsFilter from './JobsFilter'
import SkletonJobsPage from '@/app/_components/structures/skleton/SkletonJobsPage'
const Page = () => {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobtitle');
  const countryValue = searchParams.get('country')
  const [country,setCountry] = useState(countryValue||"")
  const [pageNumber, setPageNumber] = useState(1);
  const selectedCountry = (countryName: string) => {
    setCountry(countryName)
  }
  useEffect(() => {
    setPageNumber(1);
  }, [jobTitle, country]);
  const { data: allJobs } = useQuery({
    queryKey: ['allJobs', jobTitle, country, pageNumber],
    queryFn: async () => {
      const response = await axios.get(`/api/jobs?jobtitle=${jobTitle}&country=${country}&page=${pageNumber}`);
      return response.data;
    },
    staleTime: 0,
    gcTime:0,
    retry: false,
  });
  const totalResults = parseInt(allJobs?.queries?.request[0]?.totalResults);
  const returnedPageNumber = (value: number) => {
    setPageNumber(value)
  }
  if(isNaN(totalResults)){
    return <SkletonJobsPage/>
  }
  return (
    <div className="p-4">
      <SelectableCountries selectedCountry={selectedCountry} />
      {jobTitle && <JobsFilter jobtitle={jobTitle} country={country} />}
      {allJobs?.items?.map((item: any, index: number) => (
        <SingleJob index={index} link={item.link} title={item.title} snippet={item.snippet} key={index} />
      ))}
      <Navigation
        totalResults={totalResults}
        resultsPerPage={10}
        returnedPageNumber={returnedPageNumber}
      />
    </div>
  )
}
export default Page
