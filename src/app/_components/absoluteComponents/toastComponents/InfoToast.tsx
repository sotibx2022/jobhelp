"use client";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDebounce } from "@/app/functions/helperFunctions/debounce";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setToast } from "@/app/redux/toastSlice";
const InfoToast: React.FC<{ message?: string }> = ({ message = "info" }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useDebounce({
    callback: () => {
      setIsOpen(false);
    },
    delay: 5000,
    dependencies: [],
  });
  return (
    <AnimatePresence
      onExitComplete={() => dispatch(setToast({ toastType: "blank", message: "" }))}
    >
      {isOpen && (
        <motion.div
          ref={wrapperRef}
          initial={{ x: "-100vw", opacity: 0 }}
          animate={isOpen ? { x: 0, opacity: 1 } : { x: "100vw", opacity: 0 }}
          exit={{ x: "100vw", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-[20px] left-1/2 transform -translate-x-1/2 w-auto max-w-md z-10"
        >
          <div className="bg-white border-l-4 border-blue-500 shadow-lg flex items-center gap-3 p-4 relative border-0">
            <div className="flex items-center gap-3 flex-1">
              <InfoCircleBig className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <p className="text-gray-900 font-medium text-sm">{message}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex-shrink-0 border-0"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default InfoToast;
const InfoCircleBig: React.FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className}`}
    >
      {/* Animated outer circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        strokeDasharray="100"
        strokeDashoffset="100"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      {/* Animated info "i" symbol */}
      <motion.line
        x1="12"
        y1="10"
        x2="12"
        y2="16"
        strokeDasharray="100"
        strokeDashoffset="100"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.circle
        cx="12"
        cy="7"
        r="0.5"
        strokeDasharray="10"
        strokeDashoffset="10"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
    </svg>
  );
};
