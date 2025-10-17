import React from 'react'
const Loading = () => {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/30">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg font-medium text-foreground">Loading...</p>
      </div>
    </div>
  )
}
export default Loading