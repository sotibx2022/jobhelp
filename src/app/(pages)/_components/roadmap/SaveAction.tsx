"use client"
import { RootState } from '@/app/redux/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { Save, LogIn, X } from 'lucide-react'
const SaveAction = () => {
    const user = useSelector((state: RootState) => state.user)
    const [isVisible, setIsVisible] = React.useState(true)
    const handleRoadmapChange = () => {
        // Add your save logic here
    }
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
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-foreground">
                            You have unsaved changes
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {!user && (
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    Login
                                </Button>
                            </Link>
                        )}
                        <Button 
                            onClick={handleRoadmapChange}
                            size="sm"
                            className={`min-w-[100px] transition-all duration-200 ${
                                user 
                                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md" 
                                    : "bg-gray-600 hover:bg-gray-700 text-white"
                            }`}
                        >
                            {user ? (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SaveAction