import { DeleteButton, SaveButton } from '@/app/_components';
import ResetButton from '@/app/_components/structures/ResetButton';
import { addRoadMapSubTitle, addRoadMapTitle, editRoadMapSubTitle, editRoadMapTitle } from '@/app/redux/roadmapSlice';
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
interface AddTopicProps {
  defaultValue: string,
  cancelTopicChange: (value: boolean) => void;
  titleIndex?: number;
  subTitleIndex?: number,
  action?: string
}
const AddTopic: React.FC<AddTopicProps> = ({ defaultValue, cancelTopicChange, titleIndex, subTitleIndex, action }) => {
  const dispatch = useDispatch()
  const [topic, setTopic] = useState(defaultValue);
  const cancleHandler = () => {
    cancelTopicChange(true);
  }
  const saveHandler = () => {
    const definedTitle = titleIndex !== undefined && titleIndex !== null
    const definedSubTitle = subTitleIndex !== undefined && subTitleIndex !== null
    if (action === 'add') {
      if (definedTitle) {
        dispatch(addRoadMapSubTitle({ titleIndex, actionTitle: topic }))
      } else {
        dispatch(addRoadMapTitle({ actionTitle: topic }))
      }
    } else {
      if (definedSubTitle && definedTitle) {
        dispatch(
          editRoadMapSubTitle({
            titleIndex: titleIndex,
            subTitleIndex: subTitleIndex,
            actionTitle: topic,
          })
        );
        cancelTopicChange(true);
      } else if (definedTitle) {
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
      <Input type='text' placeholder='Add New Topic' className='min-w-[300px]' value={topic} onChange={(e) => setTopic(e.target.value)} />
      {topic && <div className='flexCenter gap-2'>
        <SaveButton onClick={saveHandler} />
        <ResetButton onClick={cancleHandler} />
      </div>}
    </div>
  )
}
export default AddTopic