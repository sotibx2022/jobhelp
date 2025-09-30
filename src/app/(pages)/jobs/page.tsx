'use client'  // Client Component
import React, { useState } from 'react'
import { SelectableCountries } from '../_components'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Navigation } from '@/app/_components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Briefcase, CalendarDays } from "lucide-react";
import Link from 'next/link'
const Page = () => {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobtitle');
  const [country, setCountry] = useState<string>('')
  const [pageNumber, setPageNumber] = useState(1);
  const selectedCountry = (countryName: string) => {
    setCountry(countryName)
  }
  const { data: allJobs } = useQuery({
    queryKey: ['allJobs', jobTitle, country, pageNumber],
    queryFn: async () => {
      const response = await axios.get(`/api/jobs?jobtitle=${jobTitle}&country=${country}&page=${pageNumber}`);
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
      {allJobs?.items?.map((item: any, index: number) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <Link href={item.link} target="_blank">
                <CardTitle className="secondaryHeading">{item.title}</CardTitle>
                <CardDescription className='primaryParagraph mt-2'>
                  <div className="flex gap-2 items-center">
                <CalendarDays className='h-4 w-4' />
                  {item.snippet.split('...')[0]}
              </div>
                </CardDescription>
              </Link>
            </div>
          </CardHeader>
        </Card>
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
