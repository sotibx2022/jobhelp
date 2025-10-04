import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import React from 'react'
interface SaveButtonProps {
  onClick?: () => void
}
const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative group flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
    >
      <Save className="w-5 h-5" />
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
