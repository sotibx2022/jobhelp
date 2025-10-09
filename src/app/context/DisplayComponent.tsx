"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react"
type VisibleComponent = "chatButton" | "chatBox"
interface DisplayContextType {
  visibleComponent: VisibleComponent
  setVisibleComponent: Dispatch<SetStateAction<VisibleComponent>>
}
export const DisplayContext = createContext<DisplayContextType>({
  visibleComponent: "chatButton",
  setVisibleComponent: () => {},
})
interface DisplayProviderProps {
  children: ReactNode
}
const DisplayProvider: React.FC<DisplayProviderProps> = ({ children }) => {
  const [visibleComponent, setVisibleComponent] = useState<VisibleComponent>("chatButton")
  return (
    <DisplayContext.Provider value={{ visibleComponent, setVisibleComponent }}>
      {children}
    </DisplayContext.Provider>
  )
}
export default DisplayProvider
