"use client"
import { DisplayContext } from '@/app/context/DisplayComponent'
import React, { useContext } from 'react'
import ChatBox from '../landingPage/chatting/ChatBox'
import ChatButton from '../landingPage/chatting/ChatButton'
import ErrorToast from './toastComponents/ErrorToast'
import SuccessToast from './toastComponents/SuccessToast'
import ToastComponent from './toastComponents/ToastComponent'
const AbsoluteComponent = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  return (
    <div>
      {visibleComponent === 'chatBox' && <ChatBox />}
      {visibleComponent === 'chatButton' && <ChatButton />}
      <ToastComponent/>
    </div>
  )
}
export default AbsoluteComponent