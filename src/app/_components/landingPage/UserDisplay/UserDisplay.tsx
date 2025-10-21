"use client";
import { ChevronsDown } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import ScoreDisplay from "./ScoreDisplay";
import ProfileIcon from "./ProfileIcon";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
const UserDisplay = () => {
  const [open, setOpen] = useState(false);
  const userDetails = useSelector((state: RootState) => state.user.user)
  const score = useSelector((state: RootState) => state.user.user?.score);
  const logout = useLogout()
  const borderStyle = {
    background: `conic-gradient(
      #3b82f6 ${(score??0) * 3.6}deg,
      #e5e7eb ${(score??0) * 3.6}deg
    )`
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button className="flex items-center  focus:outline-none">
          <div
            className="relative w-12 h-12 rounded-full p-[2px]"
            style={borderStyle}
          >
            <div className="flex items-center justify-center w-full h-full rounded-full bg-background">
              <ProfileIcon />
            </div>
          </div>
          <p className="primaryParagraph flexCenter gap-1">
            {userDetails ? userDetails.fullName : "Guest"}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ChevronsDown className="w-4 h-4" />
            </motion.span>
          </p>
        </button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {open && (
          <DropdownMenuContent
            asChild
            align="center"
            className="min-w-[8rem] text-sm bg-background border rounded-lg shadow-md overflow-hidden z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {(score ?? 0) > 0 && (
                <div className="p-2">
                  <ScoreDisplay />
                </div>
              )}
              <DropdownMenuItem className="justify-center">
                {userDetails ? <Link href='/profile'>Profile</Link> : <Link href='/register'>Register</Link>}
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-center">
                {userDetails ? <Button
                  variant={'destructive'}
                  onClick={() => logout.mutate({ skipBroadcast: false })}
                >
                  Logout
                </Button> : <Link href='/login'>Login</Link>}
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};
export default UserDisplay;
