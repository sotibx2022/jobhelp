import { Badge } from '@/components/ui/badge'
import React from 'react'
import ProfileIcon from '../UserDisplay/ProfileIcon'
const ChatRequest = () => {
  return (
    <div className="chatRequestWrapper p-2 border-1 border-accent-foreground">
        <div className='flex flex-col gap-2  '>
            <ProfileIcon/>
            <p className='whitespace-normal text-primary text-sm '>Whatever use wants to ask with the ai using the chatbot this is the part where the request will be made.</p>
        </div>
    </div>
  )
}
export default ChatRequest