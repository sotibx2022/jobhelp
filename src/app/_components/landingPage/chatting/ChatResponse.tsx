import { Badge } from '@/components/ui/badge'
import { BotMessageSquare } from 'lucide-react'
import React from 'react'
const ChatResponse = () => {
  return (
    <div className='chartResponseWrapper bg-muted p-2 my-2'>
        <div className='flex flex-col gap-2  '>
        <BotMessageSquare className='w-7 h-7' />
        <p  className='whitespace-normal text-primary text-sm'>This is the response returned by Chatbot which is generated from the AI using langchain framework.</p>
        </div>
    </div>
  )
}
export default ChatResponse