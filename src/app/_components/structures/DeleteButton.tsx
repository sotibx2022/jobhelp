import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React from 'react'
interface DeleteButtonProps {
  onClick?: () => void
  size?: string
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, size }) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative group" 
    >
      <Trash
        className="text-destructive group-hover:text-background"
      />
      <span
        className="absolute top-full text-xs text-destructive opacity-0 group-hover:opacity-100"
      >
        Delete
      </span>
    </Button>
  )
}
export default DeleteButton
