"use client"
import { RootState } from '@/app/redux/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { Save, LogIn, X } from 'lucide-react'
import { SaveButton } from '@/app/_components'
const SaveAction: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const user = useSelector((state: RootState) => state.user)
    const [isVisible, setIsVisible] = React.useState(true)
    const handleClose = () => {
        setIsVisible(false)
    }
    if (!isVisible) return null
    return (
        <div className='fixed bottom-[10px] right-[10px]  bg-background/95 backdrop-blur-sm border border-border/40 animate-in slide-in-from-bottom duration-300'>
            <div className='container mx-auto px-4 max-w-[500px] relative'>
                {/* Close Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted hover:bg-muted-foreground/20 shadow-sm"
                    onClick={handleClose}
                >
                    <X className="h-3 w-3" />
                </Button>
                <div className="flex items-center gap-4 justify-between py-4">
                        <p className="primaryParagraph">
                            You have unsaved changes
                        </p>
                    <SaveButton onClick={onClick}/>
                </div>
            </div>
        </div>
    )
}
export default SaveAction