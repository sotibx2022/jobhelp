import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React from 'react'
interface DeleteButtonProps {
  onClick?: () => void
  size?:"small"
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick,size }) => {
  return (
    <Button variant="outline"
      onClick={onClick}
      className="relative group flex items-center justify-center text-destructive hover:opacity-90 transition-opacity"
    >
      <Trash className={size ==='small'? "w-4 h-4" : "w-5 h-5"} />
      <span
        className="absolute top-full text-xs  text-destructive opacity-0 
                   group-hover:opacity-100"
      >
        Delete
      </span>
    </Button>
  )
}
export default DeleteButton
