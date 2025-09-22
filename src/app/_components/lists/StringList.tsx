import { CheckCheckIcon } from 'lucide-react'
import React from 'react'
const StringList: React.FC<{ stringArray?: string[] }> = ({ stringArray }) => {
    return (
        <ul>
            {stringArray && stringArray.map((responsibility: string, index: number) => {
                return <li key={index} className='flex gap-2'>
                    <CheckCheckIcon />
                    {responsibility}
                </li>
            })}
        </ul>
    )
}
export default StringList