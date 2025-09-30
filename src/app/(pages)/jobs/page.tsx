'use client'  // Client Component
import React, { useMemo, useState } from 'react'
import { SelectableCountries } from '../_components'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Navigation } from '@/app/_components'
import Link from 'next/link'
import SingleJob from './SingleJob'
import JobsFilter from './JobsFilter'
const Page = () => {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobtitle');
  const [country, setCountry] = useState<string>('')
  const [pageNumber, setPageNumber] = useState(1);
  const selectedCountry = (countryName: string) => {
    console.log(countryName);
    setCountry(countryName)
  }
  console.log(country);
  const params = useMemo(() => {
    return `jobTitle=${jobTitle}&country=${country}&page=${pageNumber}`
  }, [jobTitle, country, pageNumber])
  const { data: allJobs } = useQuery({
    queryKey: ['allJobs', params],
    queryFn: async () => {
      const response = await axios.get(`/api/jobs?${params}`);
      return response.data;
    },
  });
  const totalResults = parseInt(allJobs?.queries?.request[0]?.totalResults);
  const returnedPageNumber = (value: number) => {
    setPageNumber(value)
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
