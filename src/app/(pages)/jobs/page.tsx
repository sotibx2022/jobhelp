'use client'  // Client Component
import React, { useState } from 'react'
import { SelectableCountries } from '../_components'
import { useSearchParams } from 'next/navigation'
const Page = () => {
  const searchParams = useSearchParams();
  // Fix typo here:
  const jobTitle = searchParams.get('jobtitle'); // ✅ matches URL param
  console.log(jobTitle); // should log "maintenance planner"
  const [country, setCountry] = useState<string>('')
  const selectedCountry = (countryName: string) => {
    setCountry(countryName)
  }
  return (
    <div>
      <SelectableCountries selectedCountry={selectedCountry} />
      <p>Job Title: {jobTitle}</p>
      <p>Selected Country: {country}</p>
    </div>
  )
}
export default Page
