"use client";
import { ChevronsDown, User, LogOut, LogIn, UserPlus } from "lucide-react";
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
import ProfileIcon from "./ProfileIcon";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
const UserDisplay = () => {
  const [open, setOpen] = useState(false);
  const userDetails = useSelector((state: RootState) => state.user.user);
  const logout = useLogout();
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button className="flex items-center focus:outline-none">
          <div className="relative w-12 h-12 rounded-full p-[2px]">
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
              {/* Profile / Register */}
              <DropdownMenuItem className="justify-center gap-2">
                {userDetails ? (
                  <Link href="/profile" className="flex items-center gap-2 primaryParagraph">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                ) : (
                  <Link href="/register" className="flex items-center gap-2 primaryParagraph">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Link>
                )}
              </DropdownMenuItem>
              {/* Logout / Login */}
              <DropdownMenuItem className="justify-center gap-2">
                {userDetails ? (
                  <button
                    onClick={() => logout.mutate({ skipBroadcast: false })}
                    className="flex items-center gap-2 text-destructive focus:outline-none"
                  >
                    <LogOut className="w-4 h-4 text-destructive" />
                    Logout
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 justify-start  primaryParagraph">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                )}
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};
export default UserDisplay;
