import React, { useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import StringCheckList from './StringCheckList'
import { ContentType } from '@/app/types/roadmapTypes'
import { Badge } from '@/components/ui/badge'
interface SingleRoadMapProps {
  index: number,
  content: ContentType,
  unitScore: (args: { value: number }) => void; // only score now
}
const SingleRoadMap: React.FC<SingleRoadMapProps> = ({ index, content, unitScore }) => {
  const [score, setScore] = useState(0)
  const handleCheckedValue = (checked: boolean) => {
    const delta = checked ? 1 : -1
    setScore(prev => prev + delta)
    unitScore({ value: delta })
  }
  return (
    <div>
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="secondaryHeading">
          <h6 className="secondaryHeading">
            {content.actionTitle}
            <Badge variant="outline" className="ml-2">
              Score: {score}/{content.subContents.length}
            </Badge>
          </h6>
        </AccordionTrigger>
        <AccordionContent>
          {content.subContents.map((item: string, idx: number) => (
            <StringCheckList
              string={item}
              checkedValue={handleCheckedValue}
              key={idx}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </div>
  )
}
export default SingleRoadMap
