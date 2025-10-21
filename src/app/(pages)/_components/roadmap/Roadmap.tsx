"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetails } from "@/app/functions/queryFunctions/getJobDetails";
import { APIResponse } from "@/app/types/APIResponse";
import { ContentsType, ContentType, ContentUIType } from "@/app/types/roadmapTypes";
import { RootState } from "@/app/redux/store";
import { setRoadMapItems } from "@/app/redux/roadmapSlice";
import { Accordion } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditButton } from "@/app/_components";
import AddButton from "@/app/_components/structures/AddButton";
import ViewButton from "@/app/_components/structures/ViewButton";
import SkletonRoadmapPage from "@/app/_components/structures/skleton/SkletonRoadmapPage";
import SingleRoadMap from "./SingleRoadMap";
import AddTopic from "./AddTopic";
import SaveAction from "./SaveAction";
import { updateUserScore } from "@/app/redux/userDetailsSlice";
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.roadmapDetails);
  const [edit, setEdit] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [overallLength, setOverallLength] = useState(0);
  const [showRoadMapAction, setShowRoadMapAction] = useState(false);
  const [addTopic, setAddTopic] = useState(false);
  const [originalContents, setOriginalContents] = useState<ContentUIType[] | null>(null);
  // ✅ Fetch data only if Redux store is empty
  const shouldFetch = !contents || contents.length === 0;
  const { data, isPending } = useQuery<APIResponse<ContentsType>>({
    queryKey: ["jobContent", jobTitle],
    queryFn: () => getJobDetails<ContentsType>(`/api/contents?jobtitle=${jobTitle}`),
    enabled: shouldFetch, // only fetch when Redux has no data
  });
  // ✅ Handle score updates from child components
  const handleUnitScore = ({ value }: { value: number }) => {
    setOverallScore((prev) => prev + value);
  };
  // ✅ Detect changes to show Save button
  useEffect(() => {
    if (!originalContents) return;
    const hasChanged = JSON.stringify(contents) !== JSON.stringify(originalContents);
    setShowRoadMapAction(hasChanged);
  }, [contents, originalContents, overallScore]);
  const contentsToRender = contents ?? originalContents;
  // ✅ Calculate and sync profile score
  const score = Math.floor((overallScore / overallLength) * 100);
  useEffect(() => {
    if (!isNaN(score)) {
      dispatch(updateUserScore({score}));
    }
  }, [score, dispatch]);
  // ✅ Handle topic cancel
  const cancelTopicChange = () => {
    setAddTopic(false);
  };
  // ✅ Show skeleton during initial load
  if (isPending && shouldFetch) {
    return <SkletonRoadmapPage />;
  }
  return (
    <div className="w-full">
      <Card className="mb-4">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2">
            <h2 className="secondaryHeading capitalize">Progress</h2>
            <Badge variant="destructive">{score}%</Badge>
          </div>
          {!edit ? (
            <EditButton variant="secondary" text="Edit" onClick={() => setEdit(true)} />
          ) : (
            <ViewButton variant="secondary" text="View" onClick={() => setEdit(false)} />
          )}
        </CardHeader>
        <CardContent>
          <Progress value={score} className="h-2 mt-2" />
        </CardContent>
      </Card>
      {contents && (
        <Accordion
          type="multiple"
          defaultValue={contents.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {contentsToRender?.map((content: ContentUIType, index: number) => (
            <SingleRoadMap
              index={index}
              content={content}
              key={index}
              unitScore={handleUnitScore}
              edit={edit}
            />
          ))}
          {edit &&
            (addTopic ? (
              <AddTopic
                defaultValue="Add New Topic"
                cancelTopicChange={cancelTopicChange}
                action="add"
              />
            ) : (
              <AddButton text="Add Topic" onClick={() => setAddTopic(true)} />
            ))}
        </Accordion>
      )}
      {showRoadMapAction && <SaveAction />}
    </div>
  );
};
export default Roadmap;
