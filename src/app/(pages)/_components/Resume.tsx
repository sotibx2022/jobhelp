"use client"
import ChatBox from '@/app/_components/landingPage/chatting/ChatBox'
import ChatButton from '@/app/_components/landingPage/chatting/ChatButton'
import { DisplayContext } from '@/app/context/DisplayComponent'
import React, { useContext } from 'react'
const Resume = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  return (
    <div>
      This Fetaure is under developement where user can generate their resume using chat.
      {visibleComponent === 'chatBox' && <ChatBox />}
      {visibleComponent === 'chatButton' && <ChatButton />}
    </div>
  )
}
export default Resume