import React from "react"
interface ErrorMessageProps {
  message: string
  type: "error" | "success" | "validating" // optional status styling
}
const InputMessage: React.FC<ErrorMessageProps> = ({ message, type = "error" }) => {
  if (!message) return null // nothing to show if there's no message
  let textColor = "text-red-500"
  if (type === "success") textColor = "text-green-500"
  if (type === "validating") textColor = "text-yellow-500"
  return (
    <p className={`${textColor} text-sm mt-1 transition-all duration-200`}>
      {message}
    </p>
  )
}
export default InputMessage
