"use client"
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails'
import { APIResponse } from '@/app/types/APIResponse'
import { skillsType } from '@/app/types/skillTypes'
import { useQuery } from '@tanstack/react-query'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React from 'react'
import { StringList } from '@/app/_components'
import { ChevronDown } from 'lucide-react'
const Skills: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const { data: skills } = useQuery<APIResponse<skillsType>>({
    queryKey: ['skills', jobTitle],
    queryFn: () => getJobDetails<skillsType>(`/api/skills?jobtitle=${jobTitle}`)
  })
  return (
  <section className="flex flex-wrap">
  <Accordion type="single" collapsible className="w-full">
    {Object.entries(skills?.data?.RoleSkills || {}).map(([key, value], index) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger className="flex items-center justify-between p-4 text-lg">
          <h6 className="secondaryHeading">{key.split("_").join(" ")}</h6>
        </AccordionTrigger>
        <AccordionContent>
          <StringList stringArray={value as string[]} />
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</section>
  )
}
export default Skills