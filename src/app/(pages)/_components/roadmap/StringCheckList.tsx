"use client"
import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { DeleteButton, EditButton } from "@/app/_components"
import { useDispatch } from "react-redux"
import { deleteRoadMapSubTitle } from "@/app/redux/roadmapSlice"
import AddTopic from "./AddTopic"
interface StringCheckListProps {
  string: string
  checkedValue: (value: boolean) => void,
  edit: boolean,
  titleIndex: number,
  subTitleIndex: number
}
const StringCheckList: React.FC<StringCheckListProps> = ({ string, checkedValue, edit, titleIndex, subTitleIndex }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const [addTopic, setAddTopic] = useState(false);
  const [topic, setTopic] = useState("")
  const toggleItem = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    checkedValue(newValue) // callback to parent
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
      >
        <Checkbox checked={isChecked} onCheckedChange={toggleItem} />
        <span>{string}</span>
        {edit && <>
          <DeleteButton size="small" onClick={deleteHandler} />
          <EditButton size="small" onClick={editHandler} />
        </>}
      </div>}
  </>
  )
}
export default StringCheckList
