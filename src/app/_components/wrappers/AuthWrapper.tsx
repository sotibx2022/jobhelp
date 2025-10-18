"use client"
import { authChannel } from '@/app/config/authChannel'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux';
const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    if (!authChannel) return
    const eventHandler = (event: MessageEvent) => {
      if (event.data.message) {
        // if(message.type==='login'){
        // }
        router.refresh()
        // dispatch(setToast({ toastType: "info", message: "Logged out from another tab" }));
      }
    }
    authChannel.addEventListener("message", eventHandler)
    return () => {
      authChannel?.removeEventListener("message", eventHandler)
    }
  }, [])
  return (
    <div>{children}</div>
  )
}
export default AuthWrapper