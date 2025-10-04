import { DeleteButton, SaveButton } from '@/app/_components';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
const AddTopic = () => {
    const[topic,setTopic] = useState("");
  return (
    <div className='flex gap-2'>
        <Input type='text' placeholder='Add New Topic' className='max-w-[500px]' value={topic} onChange={(e)=>setTopic(e.target.value)}/>
        {topic && <div className='flexCenter gap-2'>
            <SaveButton/>
            <DeleteButton/>
            </div>}
    </div>
  )
}
export default AddTopic