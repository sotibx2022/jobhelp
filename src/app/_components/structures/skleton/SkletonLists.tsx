import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'
import SkeletonBox from './SkletonBox'
interface SkeletonListsProps {
  listLength: number
  className?: string
}
const SkeletonLists: React.FC<SkeletonListsProps> = ({ listLength, className }) => {
  return (
    <>
      {Array.from({ length: listLength }).map((_, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <SkeletonBox className="w-8 h-8 roundedSmall" />
          <Skeleton className={cn("h-8 bg-muted/60 roundedSmall", className)} />
        </div>
      ))}
    </>
  )
}
export default SkeletonLists
