"use client"
import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { DeleteButton, EditButton } from "@/app/_components"
interface StringCheckListProps {
  string: string
  checkedValue: (value: boolean) => void
}
const StringCheckList: React.FC<StringCheckListProps> = ({ string, checkedValue }) => {
  const [isChecked, setIsChecked] = useState(false)
  const toggleItem = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    checkedValue(newValue) // callback to parent
  }
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded ${
        isChecked ? "bg-green-100 line-through text-gray-500" : ""
      }`}
    >
      <Checkbox checked={isChecked} onCheckedChange={toggleItem} />
      <span>{string}</span>
      <DeleteButton/>
      <EditButton/>
    </div>
  )
}
export default StringCheckList
