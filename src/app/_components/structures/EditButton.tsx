import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React from 'react'
interface EditButtonProps {
  onClick?: () => void
  size?: 'small'
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  text?: string // 👈 optional text prop
}
const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  size,
  variant = 'outline',
  text = 'Edit', // 👈 default to "Edit"
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity"
    >
      <Edit className={size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} />
      <span className="text-sm">{text}</span>
    </Button>
  )
}
export default EditButton
