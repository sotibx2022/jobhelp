import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import React from 'react'
interface ResetButtonProps {
  onClick?: () => void
  size?: string
}
const ResetButton: React.FC<ResetButtonProps> = ({ onClick, size }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative group"
    >
      <RotateCcw
        className="text-blue-500 group-hover:text-background"
      />
      <span
        className="absolute top-full text-xs text-blue-500 opacity-0 group-hover:opacity-100"
      >
        Reset
      </span>
    </Button>
  )
}
export default ResetButton
