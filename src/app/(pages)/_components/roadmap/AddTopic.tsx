import { DeleteButton, SaveButton } from '@/app/_components';
import { addRoadMapSubTitle, addRoadMapTitle, editRoadMapSubTitle, editRoadMapTitle } from '@/app/redux/roadmapSlice';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
interface AddTopicProps {
  defaultValue: string,
  cancelTopicChange: (value: boolean) => void;
  titleIndex: number;
  subTitleIndex?: number,
  action?:string
}
const AddTopic: React.FC<AddTopicProps> = ({ defaultValue, cancelTopicChange, titleIndex, subTitleIndex,action }) => {
  console.log(subTitleIndex);
  const dispatch = useDispatch()
  const [topic, setTopic] = useState(defaultValue);
  const cancleHandler = () => {
    cancelTopicChange(true);
  }
  const saveHandler = () => {
     if(action ==='add'){
     if(titleIndex !==undefined && titleIndex !==null){
      dispatch(addRoadMapSubTitle({titleIndex,actionTitle:topic}))
     }else{
      dispatch(addRoadMapTitle({actionTitle:topic}))
     }
     }else{
 if (subTitleIndex !== undefined && subTitleIndex !== null) {
      dispatch(
        editRoadMapSubTitle({
          titleIndex: titleIndex,
          subTitleIndex: subTitleIndex,
          actionTitle: topic,
        })
      );
      cancelTopicChange(true);
    } else {
      dispatch(
        editRoadMapTitle({
          index: titleIndex,
          actionTitle: topic,
        })
      );
      cancelTopicChange(true);
    }
     }
  };
  return (
    <div className='flex gap-2'>
      <Input type='text' placeholder='Add New Topic' className='max-w-[500px]' value={topic} onChange={(e) => setTopic(e.target.value)} />
      {topic && <div className='flexCenter gap-2'>
        <SaveButton onClick={saveHandler} />
        <DeleteButton onClick={cancleHandler} />
      </div>}
    </div>
  )
}
export default AddTopic