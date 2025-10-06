"use client"
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails'
import { APIResponse } from '@/app/types/APIResponse'
import { ContentsType, ContentType } from '@/app/types/roadmapTypes'
import { useQuery } from '@tanstack/react-query'
import { Accordion } from "@/components/ui/accordion"
import React, { useEffect, useState } from 'react'
import SingleRoadMap from './SingleRoadMap'
import AddTopic from './AddTopic'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Badge } from '@/components/ui/badge'
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const[edit,setEdit] = useState(false);
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
  const onEdit =() =>{
    setEdit(true)
  }
  return (
    <div className="w-full">
       <Card >
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="secondaryHeading flex flex-col">
            Detailed Checklist of {" "}
            <span className="primaryHeading capitalize">{jobTitle}</span>
          </h2>
        </div>
        <Button onClick={onEdit} variant="default" className="gap-2">
          <Edit size={18} />
          Edit
        </Button>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <Badge
        variant="destructive"
        className="text-lg px-5 py-3 rounded-xl font-semibold tracking-wide shadow-md"
      >
        {score}%
      </Badge>
        <Progress value={score} className="h-2 mt-2" />
      </CardContent>
    </Card>
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
              edit={edit}
            />
          ))}
        </Accordion>
      )}
      <AddTopic/>
    </div>
  )
}
export default Roadmap
