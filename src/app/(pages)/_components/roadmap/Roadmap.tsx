"use client"
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails'
import { APIResponse } from '@/app/types/APIResponse'
import { ContentsType, ContentType } from '@/app/types/roadmapTypes'
import { useQuery } from '@tanstack/react-query'
import { Accordion } from "@/components/ui/accordion"
import React from 'react'
import SingleRoadMap from './SingleRoadMap'
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const { data } = useQuery<APIResponse<ContentsType>>({
    queryKey: ['jobContent', jobTitle],
    queryFn: () => getJobDetails<ContentsType>(`/api/contents?jobtitle=${jobTitle}`)
  })
  const jobContents = data?.data
  return (
    <div className="w-full">
      {jobContents && (
        <Accordion
          type="multiple"
          defaultValue={jobContents.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {jobContents.map((content: ContentType, index: number) => (
            <SingleRoadMap index={index} content={content} key={index} />
          ))}
        </Accordion>
      )}
    </div>
  )
}
export default Roadmap
