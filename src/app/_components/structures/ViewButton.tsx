import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import React from 'react'
interface ViewButtonProps {
  onClick?: () => void
  size?: 'small'
  text?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}
const ViewButton: React.FC<ViewButtonProps> = ({ onClick, size, text, variant = 'outline' }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="relative group" 
    >
      <Eye className={size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} />
      {text ? (
        <span className="text-sm">{text}</span>
      ) : (
        <span className="absolute top-full text-xs text-foreground opacity-0 group-hover:opacity-100">
          View
        </span>
      )}
    </Button>
  )
}
export default ViewButton
