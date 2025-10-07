import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StringCheckList from "./StringCheckList";
import { ContentType } from "@/app/types/roadmapTypes";
import { Badge } from "@/components/ui/badge";
import { DeleteButton, EditButton } from "@/app/_components";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { useDispatch } from "react-redux";
import { deleteRoadmapTitle } from "@/app/redux/roadmapSlice";
import AddTopic from "./AddTopic";
interface SingleRoadMapProps {
  index: number;
  content: ContentType;
  unitScore: (args: { value: number }) => void;
  edit: boolean;
}
const SingleRoadMap: React.FC<SingleRoadMapProps> = ({
  index,
  content,
  unitScore,
  edit,
}) => {
  const[addTopic,setAddTopic] = useState(false);
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const handleCheckedValue = (checked: boolean) => {
    const delta = checked ? 1 : -1;
    setScore((prev) => prev + delta);
    unitScore({ value: delta });
  };
  function handleDelete(index: number) {
    alert('delete request');
    dispatch(deleteRoadmapTitle({ index }))
  }
  function handleEdit() {
    setAddTopic(true)
  }
  const cancleTopicChange =(value:boolean)=>{
    setAddTopic(false)
  }
  return (
    <AccordionItem value={`item-${index}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <AccordionTrigger className="flex items-center">
          {addTopic?<AddTopic defaultValue={content.actionTitle} cancelTopicChange={cancleTopicChange}/>:<span className="secondaryHeading">{content.actionTitle}</span>}
          <Badge variant="outline" className="ml-2">
            Score: {score}/{content.subContents.length}
          </Badge>
        </AccordionTrigger>
        <div>
          {/* Left section: title + buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            {edit && (
              <div className="flex gap-2"><DeleteButton onClick={() => {
                handleDelete(index);
              }} />
                <EditButton onClick={() => {
                  handleEdit();
                }} />
              </div>
            )}
          </div>
          {/* Right section: badge */}
        </div>
      </div>
      {/* Accordion Body */}
      <AccordionContent className="px-4 pb-4">
        {content.subContents.map((item: string, idx: number) => (
          <StringCheckList
            key={idx}
            string={item}
            checkedValue={handleCheckedValue}
            edit={edit}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
export default SingleRoadMap;
