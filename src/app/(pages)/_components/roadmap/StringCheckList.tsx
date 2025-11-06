"use client"
import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { DeleteButton, EditButton } from "@/app/_components"
import { useDispatch } from "react-redux"
import { deleteRoadMapSubTitle, editRoadMapSubTitle } from "@/app/redux/roadmapSlice"
import AddTopic from "./AddTopic"
import { AnimatePresence, motion } from "framer-motion"
interface StringCheckListProps {
  subContent: { actionSubTitle: string, checked: boolean }
  checkedValue: (value: boolean) => void,
  edit: boolean,
  titleIndex: number,
  subTitleIndex: number
}
const StringCheckList: React.FC<StringCheckListProps> = ({ subContent, checkedValue, edit, titleIndex, subTitleIndex }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(subContent.checked)
  const [isHovered, setIsHovered] = useState(false)
  const [addTopic, setAddTopic] = useState(false);
  const [topic, setTopic] = useState(subContent.actionSubTitle)
  const toggleItem = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    checkedValue(newValue)
    dispatch(editRoadMapSubTitle({ titleIndex, subTitleIndex, actionTitle: topic, checked: newValue }))
  }
  function deleteHandler(): void {
    dispatch(deleteRoadMapSubTitle({ titleIndex, subTitleIndex }))
  }
  function editHandler(): void {
    setAddTopic(true);
  }
  const cancleTopicChange = (value: boolean) => {
    setAddTopic(false)
  }
  return (<>
    {addTopic ? <AddTopic defaultValue={topic} cancelTopicChange={cancleTopicChange} titleIndex={titleIndex} subTitleIndex={subTitleIndex} /> :
      <div
        className={`flex items-center gap-2 p-2 rounded ${isChecked ? "bg-green-100 line-through text-gray-500" : ""
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Checkbox
          checked={isChecked}
          onCheckedChange={toggleItem}
          disabled={!edit}
        />
        <span>{subContent.actionSubTitle}</span>
        <AnimatePresence>
          {edit && isHovered && (
            <motion.div
              key="hover-buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex gap-1"
            >
              <DeleteButton size="small" onClick={deleteHandler} />
              <EditButton size="small" onClick={editHandler} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>}
  </>
  )
}
export default StringCheckList
