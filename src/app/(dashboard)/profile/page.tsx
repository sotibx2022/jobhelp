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
import ProfileSkleton from "./ProfileSkleton";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { BriefcaseBusiness, Icon } from "lucide-react";
import { useRouter } from "next/navigation";
const Page = () => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user);
    const content = useSelector((state: RootState) => state.roadmapDetails);
    const reduxJobTitle = content.jobTitle;
    const reduxScore = useOverallScore(content.roadMapContents);
    if (!user.initialized) {
        return <ProfileSkleton />
    }
    return (
        <div>
            <div className="dbItems">
                {user?.user?.jobTitles && user?.user.jobTitles.length > 0 ? (
                    <>
                        <h2 className="secondaryHeading">Saved Job Titles</h2>
                        {user?.user.jobTitles.map((singleJobTitle: SingleJobTitle, index: number) => (
                            <ProgressCard jobTitle={singleJobTitle.title} score={singleJobTitle.score} editValue={false} key={index} editable={false} />
                        ))}
                    </>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <BriefcaseBusiness />
                            </EmptyMedia>
                            <EmptyTitle>No Job Saved</EmptyTitle>
                            <EmptyDescription className="primaryParagraph">
                                Hi, <span className="font-bold">{user.user?.fullName}</span>
                                <br />
                                There are no jobs saved in the database for this user.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button onClick={() => router.push('/')}>Add Profile</Button>
                        </EmptyContent>
                    </Empty>
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
