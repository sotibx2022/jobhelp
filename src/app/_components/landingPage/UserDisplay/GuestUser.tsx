import { UserCircle } from 'lucide-react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'
const GuestUser = () => {
    let score;
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-col items-center gap-2 focus:outline-none">
          {/* User icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-muted-foreground/20">
            <UserCircle className="w-6 h-6 text-foreground" />
          </div>
          {/* Score + progress */}
          {score && <div className="w-24 text-center">
            <p className="text-sm font-medium flex justify-center items-center gap-1">
              Score <Badge variant="outline">{score}%</Badge>
            </p>
            <div className="relative w-full h-1 bg-muted-foreground/30 rounded-full mt-1">
              <div
                className="absolute top-0 left-0 h-full bg-foreground rounded-full transition-all duration-300"
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="min-w-[8rem] text-sm">
          <DropdownMenuLabel className="text-center font-medium">
            Guest User
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center">Register</DropdownMenuItem>
          <DropdownMenuItem className="justify-center">Login</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default GuestUser
