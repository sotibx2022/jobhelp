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
  variant = "outline",
  text
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className='relative group'
    >
      <Edit className={size === 'small' ? 'w-3 h-3' : 'w-5 h-5'} />
      {text ? <span className="text-sm">{text}</span> : <span
        className="absolute top-full text-xs  text-primary opacity-0 
                   group-hover:opacity-100"
      >
        Edit
      </span>}
    </Button>
  )
}
export default EditButton
