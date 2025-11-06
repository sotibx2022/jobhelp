"use client";
import React from "react";
import SkeletonBox from "./SkletonBox";
const SearchBarSkeleton: React.FC = () => {
    return (
        <div className="flexCenter space-x-4 roundedExtra">
            <div className="relative flex-1 p-4">
                <SkeletonBox className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" /> 
                <SkeletonBox className="w-full h-12  pl-10 pr-24" />
                <SkeletonBox className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            </div>
            <SkeletonBox className="w-12 h-12 bg-secondary " />
        </div>
    );
};
export default SearchBarSkeleton;
