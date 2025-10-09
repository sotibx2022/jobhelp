"use client";
import { UserCircle } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import ScoreDisplay from "./ScoreDisplay";
import ProfileIcon from "./ProfileIcon";
const GuestUser = () => {
  const score = useSelector((state: RootState) => state.profileScore.scoreValue)
  const borderStyle = {
    background: `conic-gradient(
      #3b82f6 ${score * 3.6}deg,
      #e5e7eb ${score * 3.6}deg
    )`,
  };
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-col items-center gap-2 focus:outline-none">
          <div
            className="relative w-12 h-12 rounded-full p-[2px]"
            style={borderStyle}
          >
            <div className="flex items-center justify-center w-full h-full rounded-full bg-background">
              <ProfileIcon />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="min-w-[8rem] text-sm">
          <DropdownMenuLabel className="text-center font-medium">
            Guest User
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {score && score > 0 && <ScoreDisplay />}
          <DropdownMenuItem className="justify-center">Register</DropdownMenuItem>
          <DropdownMenuItem className="justify-center">Login</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default GuestUser;
