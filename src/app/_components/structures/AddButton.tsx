import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
interface AddButtonProps {
  onClick?: () => void
  size?: 'small'
  text?: string }
const AddButton: React.FC<AddButtonProps> = ({ onClick, size, text }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`relative group flex items-center justify-center gap-2 text-foreground hover:opacity-90 transition-opacity ${
        text ? 'px-3 py-2' : ''
      }`}
    >
      <Plus className={size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} />
      {/* If text prop is provided, show it next to the icon */}
      {text ? (
        <span className="text-sm">{text}</span>
      ) : (
        <span className="absolute top-full text-xs text-foreground opacity-0 group-hover:opacity-100">
          Add
        </span>
      )}
    </Button>
  )
}
export default AddButton
