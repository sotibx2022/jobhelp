"use client"
import { DisplayContext } from '@/app/context/DisplayComponent'
import React, { useContext } from 'react'
import ChatBox from '../landingPage/chatting/ChatBox'
import ChatButton from '../landingPage/chatting/ChatButton'
const AbsoluteComponent = () => {
    const{visibleComponent, setVisibleComponent} = useContext(DisplayContext)
    console.log(visibleComponent)
  return (
    <div>
        {visibleComponent ==='chatBox' && <ChatBox/>}
        {visibleComponent==='chatButton' && <ChatButton/>}
    </div>
  )
}
export default AbsoluteComponent