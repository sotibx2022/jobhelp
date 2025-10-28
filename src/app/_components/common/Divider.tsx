import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import React from 'react'
const Divider:React.FC<{text:string}> = ({text}) => {
  return (
    < div className="flex items-center w-full">
    <Separator className="flex-1" />
        <Badge variant={'outline'}>{text}</Badge>
        <Separator className="flex-1" />
        </div>
  )
}
export default Divider