"use client"
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails'
import { APIResponse } from '@/app/types/APIResponse'
import { ContentsType, ContentType } from '@/app/types/roadmapTypes'
import { useQuery } from '@tanstack/react-query'
import { Accordion } from "@/components/ui/accordion"
import React, { useEffect, useState } from 'react'
import SingleRoadMap from './SingleRoadMap'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Badge } from '@/components/ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { setRoadMapItems } from '@/app/redux/roadmapSlice'
import { RootState } from '@/app/redux/store'
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const contents = useSelector((state: RootState) => state.roadmapDetails)
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false);
  const { data } = useQuery<APIResponse<ContentsType>>(
    {
      queryKey: ['jobContent', jobTitle],
      queryFn: () => getJobDetails<ContentsType>(`/api/contents?jobtitle=${jobTitle}`),
      enabled: !contents || contents.length === 0
    }
  );
  const jobContents = data?.data
  const [overallScore, setOverallScore] = useState(0)
  const [overallLength, setOverallLength] = useState(0)
  const handleUnitScore = ({ value }: { value: number }) => {
    setOverallScore(prev => prev + value)
  }
  useEffect(() => {
    if (jobContents) {
      dispatch(setRoadMapItems(jobContents))
      const totalLength = jobContents.reduce((acc, content) => {
        return acc + content.subContents.length
      }, 0)
      setOverallLength(totalLength)
    }
  }, [jobContents])
  const score = Math.floor((overallScore / overallLength) * 100)
  const onEdit = () => {
    setEdit(true)
  }
  return (
    <div className="w-full">
      <Card >
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className='flex gap-2'>
            <h2 className="secondaryHeading capitalize">Progress</h2>
            <Badge variant="destructive">{score}%</Badge>
          </div>
          <Button onClick={onEdit} variant="default" className="gap-2">
            <Edit size={18} />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <Progress value={score} className="h-2 mt-2" />
        </CardContent>
      </Card>
      {contents && (
        <Accordion
          type="multiple"
          defaultValue={contents.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {contents.map((content: ContentType, index: number) => (
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
    </div>
  )
}
export default Roadmap
