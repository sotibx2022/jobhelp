"use client"
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails'
import { APIResponse } from '@/app/types/APIResponse'
import { ContentsType, ContentType } from '@/app/types/roadmapTypes'
import { useQuery } from '@tanstack/react-query'
import { Accordion } from "@/components/ui/accordion"
import React, { useEffect, useState } from 'react'
import SingleRoadMap from './SingleRoadMap'
import AddTopic from './AddTopic'
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const { data } = useQuery<APIResponse<ContentsType>>({
    queryKey: ['jobContent', jobTitle],
    queryFn: () => getJobDetails<ContentsType>(`/api/contents?jobtitle=${jobTitle}`)
  })
  const [overallScore, setOverallScore] = useState(0)
  const [overallLength, setOverallLength] = useState(0)
  const jobContents = data?.data
  // Only increment overallScore when a child reports a change
  const handleUnitScore = ({ value }: { value: number }) => {
    setOverallScore(prev => prev + value)
  }
  // Compute total length once when jobContents loads
  useEffect(() => {
    if (jobContents) {
      const totalLength = jobContents.reduce((acc, content) => {
        return acc + content.subContents.length
      }, 0)
      setOverallLength(totalLength)
    }
  }, [jobContents])
  const score = Math.floor((overallScore/overallLength)*100)
  return (
    <div className="w-full">
      <h1 className="primaryHeading">ProgressMeter: {score} %</h1>
      {jobContents && (
        <Accordion
          type="multiple"
          defaultValue={jobContents.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {jobContents.map((content: ContentType, index: number) => (
            <SingleRoadMap
              index={index}
              content={content}
              key={index}
              unitScore={handleUnitScore}
            />
          ))}
        </Accordion>
      )}
      <AddTopic/>
    </div>
  )
}
export default Roadmap
