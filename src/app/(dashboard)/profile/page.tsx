"use client";
import { useOverallScore } from "@/app/(pages)/_components/roadmap/useOverallLength";
import { RootState } from "@/app/redux/store";
import { SingleJobTitle } from "@/app/types/userAuth";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProgressCard from "./Progress";
const Page = () => {
    const user = useSelector((state: RootState) => state.user?.user);
    const content = useSelector((state: RootState) => state.roadmapDetails);
    const reduxJobTitle = content.jobTitle;
    const reduxScore = useOverallScore(content.roadMapContents);
    return (
        <div>
            <div className="dbItems">
                {user?.jobTitles && user.jobTitles.length > 0 ? (
                    <>
                        <h2 className="secondaryHeading">Saved Job Titles</h2>
                        {user.jobTitles.map((singleJobTitle: SingleJobTitle, index: number) => (
                            <ProgressCard jobTitle={singleJobTitle.title} score={singleJobTitle.score} editValue={false} key={index} editable={false}/>
                        ))}
                    </>
                ) : (
                    <h2>There are no Saved Job Titles</h2>
                )}
            </div>
            {reduxJobTitle && <div className="reduxItem">
                <h2 className="secondaryHeading">Local Job Title</h2>
                <ProgressCard jobTitle={reduxJobTitle} score={reduxScore} editValue={false} editable={false} />
            </div>}
        </div>
    );
};
export default Page;
