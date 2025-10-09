"use client"
import { DisplayContext } from '@/app/context/DisplayComponent'
import { Button } from '@/components/ui/button'
import { MessagesSquare } from 'lucide-react'
import React, { useContext } from 'react'
const ChatButton = () => {
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
    return (
        <div className='fixed top-1/2 right-0'>
            <Button onClick={()=>setVisibleComponent("chatBox")}>
                <MessagesSquare />
            </Button>
        </div>
    )
}
export default ChatButton