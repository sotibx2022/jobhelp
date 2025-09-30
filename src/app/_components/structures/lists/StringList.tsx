import { Badge } from '@/components/ui/badge'
import { CheckCheckIcon } from 'lucide-react'
import React from 'react'
const StringList: React.FC<{ stringArray?: string[] }> = ({ stringArray }) => {
    return (
        <ul className='flex flex-col gap-2'>
            {stringArray && stringArray.map((responsibility: string, index: number) => {
                return <li key={index} className='flex gap-2 primaryParagraph'>
                    <CheckCheckIcon />
                    <span className="capitalize">{responsibility}</span>
                </li>
            })}
        </ul>
    )
}
export default StringList