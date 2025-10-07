"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import SkeletonBox from "./SkletonBox";
interface SkeletonCardProps {
  className?: string;
}
const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <Card className={`animate-pulse bg-muted/30 ${className}`}>
      <CardHeader>
        <SkeletonBox className="w-full h-1/4" />
      </CardHeader>
      <CardContent className="flex-1">
        <SkeletonBox className="w-full h-2/4" />
      </CardContent>
      <CardFooter>
        <SkeletonBox className="w-full h-1/4" />
      </CardFooter>
    </Card>
  );
};
export default SkeletonCard;
