import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React from 'react'
interface EditButtonProps {
  onClick?: () => void
}
const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative group flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
    >
      <Edit className="w-5 h-5" />
      {/* Tooltip-style label */}
      <span
        className="absolute top-full text-xs text-foreground opacity-0 group-hover:opacity-100"
      >
        Edit
      </span>
    </Button>
  )
}
export default EditButton
