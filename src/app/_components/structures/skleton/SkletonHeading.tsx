import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'
interface SkeletonHeadingProps {
  className?: string
}
const SkeletonHeading: React.FC<SkeletonHeadingProps> = ({ className }) => {
  return <Skeleton className={cn("", className)} />
}
export default SkeletonHeading
