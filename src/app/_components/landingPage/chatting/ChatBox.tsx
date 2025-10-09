"use client"
import { DisplayContext } from '@/app/context/DisplayComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React, { useContext } from 'react'
import ChatRequest from './ChatRequest'
import ChatResponse from './ChatResponse'
import { Textarea } from '@/components/ui/textarea'
import { Send, X } from 'lucide-react'
const ChatBox = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  return (
    <Card className='fixed bottom-[10px] right-0 w-1/3 h-[500px] '>
      <CardHeader className="flex justify-between items-center  ">
        <h2 className='secondaryHeading'>Chat for JobRise</h2>
        <Button onClick={() => setVisibleComponent("chatButton")} variant={"outline"}>
          <X />
        </Button>
      </CardHeader>
      <CardContent className='overflow-y-scroll overflox-x-hidden mb-4'>
        <ChatRequest />
        <ChatResponse />
        <ChatRequest />
        <ChatResponse />
        <ChatRequest />
        <ChatResponse />
        <ChatRequest />
        <ChatResponse />
        <ChatRequest />
        <ChatResponse />
      </CardContent>
      <CardFooter className='absolute bottom-[10px] w-full h-[80px]'>
        <div className="textareawrapper relative w-full h-full">
          <Textarea placeholder="Type your message here..." className='w-full h-full bg-background' />
          <Button variant={"outline"} className='absolute bottom-[10px] right-[10px]'> 
          <Send className="w-5 h-5"/>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
export default ChatBox