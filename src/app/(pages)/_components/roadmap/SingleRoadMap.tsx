import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StringCheckList from "./StringCheckList";
import { ContentType, ContentUIType } from "@/app/types/roadmapTypes";
import { Badge } from "@/components/ui/badge";
import { DeleteButton, EditButton } from "@/app/_components";
import { useDispatch } from "react-redux";
import { deleteRoadmapTitle } from "@/app/redux/roadmapSlice";
import AddTopic from "./AddTopic";
import AddButton from "@/app/_components/structures/AddButton";
interface SingleRoadMapProps {
  index: number;
  content: ContentUIType;
  unitScore: (args: { value: number }) => void;
  edit: boolean;
}
const SingleRoadMap: React.FC<SingleRoadMapProps> = ({
  index,
  content,
  unitScore,
  edit,
}) => {
  const [addTopic, setAddTopic] = useState(false);
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const handleCheckedValue = (checked: boolean) => {
    const delta = checked ? 1 : -1;
    setScore((prev) => prev + delta);
    unitScore({ value: delta });
  };
  const handleDelete = (index: number) => {
    alert("delete request");
    dispatch(deleteRoadmapTitle({ index }));
  };
  const handleEdit = () => {
    setAddTopic(true);
  };
  const cancleTopicChange = (value: boolean) => {
    setAddTopic(false);
  };
  return (
    <AccordionItem value={`item-${index}`} className="border rounded-lg mb-4">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex justify-between items-center w-full pr-4">
          {/* Left side: Title and Badge */}
          <div className="flex items-center gap-3">
            {edit && addTopic ? (
              <AddTopic
                defaultValue={content.actionTitle}
                cancelTopicChange={cancleTopicChange}
                titleIndex={index}
              />
            ) : (
              <span className="secondaryHeading">{content.actionTitle}</span>
            )}
            <Badge variant="secondary" className="ml-2">
              Score: {score}/{content.subContents.length}
            </Badge>
          </div>
          {/* Right side: Edit/Delete buttons */}
          {edit && !addTopic && (
            <div className="flex items-center gap-2">
              <EditButton onClick={handleEdit} />
              <DeleteButton size="small" onClick={() => handleDelete(index)} />
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-3">
        <div className="space-y-2 mb-3">
          {content.subContents.map((item, idx: number) => (
            <StringCheckList
              key={idx}
            subContent={item}
              checkedValue={handleCheckedValue}
              edit={edit}
              titleIndex={index}
              subTitleIndex={idx}
            />
          ))}
        </div>
        {edit && (
          <div className="mt-3">
            {addTopic ? (
              <AddTopic
                defaultValue="Add New Sub Topic"
                cancelTopicChange={cancleTopicChange}
                titleIndex={index}
                action="add"
              />
            ) : (
              <AddButton 
                size="small" 
                onClick={() => setAddTopic(!addTopic)} 
                text="Add Sub Title" 
              />
            )}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
export default SingleRoadMap;