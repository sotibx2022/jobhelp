import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
const ScoreDisplay = () => {
    const score = useSelector((state: RootState) => state.user.user?.score)
    return (
        <div className='my-2'>
            {score && (
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                        <span className="primaryParagraph">Progress</span>
                        <Badge variant="destructive">{score}%</Badge>
                    </div>
                   <Progress value={score}/>
                </div>
            )}
        </div>
    )
}
export default ScoreDisplay