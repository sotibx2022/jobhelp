import { Button } from '@/components/ui/button';
import { MessageSquareShare } from 'lucide-react';
import React from 'react'
interface ShareButtonProps{
    onClick:()=>void;
}
const ShareButton:React.FC<ShareButtonProps> = ({onClick}) => {
  return (
    <div className="shareButton fixed top-1/2 transform -translate-y-1/2 right-0">
      <Button variant={'secondary'} onClick={onClick} className='group relative'><MessageSquareShare />
    <span className='absolute top-full left-0 transform -translate-X-1/2 w-full h-[20px] text-secondary opacity-0 group-hover:opacity-100'>Share</span></Button>
    </div>
  )
}
export default ShareButton