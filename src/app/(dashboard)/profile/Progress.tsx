"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { EditButton } from "@/app/_components";
import ViewButton from "@/app/_components/structures/ViewButton";
import { useRouter } from "next/navigation";
interface ProgressCardProps {
    jobTitle: string;
    score: number;
    editValue?: boolean;
    setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    editable:boolean;
}
const ProgressCard: React.FC<ProgressCardProps> = ({
    jobTitle,
    score,
    editValue,
    setEdit,
    editable,
}) => {
    const [editRoadMap, setEditRoadmap] = useState(editValue?editValue:false);
    const router = useRouter()
    useEffect(() => {
        if (setEdit) {
            setEdit(editRoadMap)
        }
    }, [editRoadMap])
    function redirectToRoadMap(): void {
        router.push(`/roadmap?jobtitle=${jobTitle}`)
    }
    return (
        <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="secondaryHeading capitalize">{jobTitle}</h2>
                <div className="flex items-center gap-2">
                    <h2 className="secondaryHeading capitalize">Progress</h2>
                    <Badge variant="destructive">{score}%</Badge>
                </div>
                {!editable &&<ViewButton
      variant="secondary"
      text="Explore"
      onClick={redirectToRoadMap}
    /> }
    {editable && 
   ( editRoadMap ? 
      <EditButton
        variant="secondary"
        text="Edit"
        onClick={() => setEditRoadmap(true)}
      />
     : 
      <ViewButton
        variant="secondary"
        text="View"
        onClick={() => setEditRoadmap(false)}
      />
   ) }
            </CardHeader>
            <CardContent>
                <ProgressBar value={score} className="h-2 mt-2" />
            </CardContent>
        </Card>
    );
};
export default ProgressCard;
