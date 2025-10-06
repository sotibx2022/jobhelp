import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import React from 'react'
interface SaveButtonProps {
  onClick?: () => void,
  size?:"small"
}
const SaveButton: React.FC<SaveButtonProps> = ({ onClick,size }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative group flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
    >
      <Save className={size ==='small'? "w-4 h-4" : "w-5 h-5"}  />
      {/* Tooltip-style label */}
      <span
        className="absolute top-full text-xs text-foreground opacity-0 group-hover:opacity-100"
      >
        Save
      </span>
    </Button>
  )
}
export default SaveButton
