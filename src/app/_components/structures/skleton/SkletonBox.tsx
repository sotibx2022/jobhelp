"use client";
import React from "react";
import { cn } from "@/lib/utils"; 
interface SkeletonBoxProps {
  className?: string; 
}
const SkeletonBox: React.FC<SkeletonBoxProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted/60 roundedLarge",
        className
      )}
    />
  );
};
export default SkeletonBox;
