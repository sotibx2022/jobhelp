import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import StringCheckList from './StringCheckList'
import { ContentType } from '@/app/types/roadmapTypes'
interface SingleRoadMapProps{
  index:number,
  content:ContentType
}
const SingleRoadMap:React.FC<SingleRoadMapProps> = ({index,content}) => {
  return (
    <div><AccordionItem  value={`item-${index}`}>
              <AccordionTrigger className="flex items-center justify-between p-4 text-lg">
                <h6 className="secondaryHeading">{content.actionTitle}</h6>
              </AccordionTrigger>
              <AccordionContent>
             {content.subContents.map((content:string,index:number)=>{
              return    <StringCheckList string={content} checkedValue={function (value: boolean): void {
          throw new Error('Function not implemented.')
        } } key={index}/>
             })}
              </AccordionContent>
            </AccordionItem></div>
  )
}
export default SingleRoadMap