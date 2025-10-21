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
import { SingleJobTitle } from "@/app/types/userAuth";
import { modifyAIDataforRoadMap } from "./modifyAIDataforRoadmap";
import { setJobTitles } from "@/app/redux/userDetailsSlice";
import { useOverallLength } from "./useOverallLength";
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.roadmapDetails);
  const [edit, setEdit] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [overallLength, setOverallLength] = useState(0);
  const [addTopic, setAddTopic] = useState(false);
  const [originalContents, setOriginalContents] = useState<ContentUIType[] | null>(null);
  const hasChanged = JSON.stringify(contents) !== JSON.stringify(originalContents);
  const [showRoadMapAction, setShowRoadMapAction] = useState<boolean>(hasChanged);
  const user = useSelector((state: RootState) => state.user);
  const isThereSavedJobTitleinDB = user.user?.jobTitles?.some(
    (item: SingleJobTitle) => item.title === jobTitle
  );
  const hasNoContents = !contents || contents.length === 0;
const shouldFetchfromDB = hasNoContents && isThereSavedJobTitleinDB;
const shouldFetchfromAI = hasNoContents && !isThereSavedJobTitleinDB;
console.log("🧩 Debug JobContent Fetch Conditions");
console.log("contents:", contents);
console.log("contents length:", contents?.length);
console.log("isThereSavedJobTitleinDB:", isThereSavedJobTitleinDB);
console.log("hasNoContents:", hasNoContents);
console.log("shouldFetchfromDB:", shouldFetchfromDB);
console.log("shouldFetchfromAI:", shouldFetchfromAI);
const { data: datafromAI, isPending: pendingfromAI } = useQuery<APIResponse<ContentsType>>({
  queryKey: ["jobContentfromAI", jobTitle],
  queryFn: () => getJobDetails<ContentsType>(`/api/contents?jobtitle=${jobTitle}`),
  enabled: Boolean(shouldFetchfromAI),
});
console.log("AI Query initialized");
console.log("datafromAI:", datafromAI);
console.log("pendingfromAI:", pendingfromAI);
const { data: datafromDb, isPending: pendingfromDB } = useQuery<APIResponse<ContentUIType[]>>({
  queryKey: ['jobContentfromDB', jobTitle],
  queryFn: () => getJobDetails<ContentUIType[]>(`/api/dbcontents?jobtitle=${jobTitle}`),
  enabled: Boolean(shouldFetchfromDB),
});
console.log("DB Query initialized");
console.log("datafromDb:", datafromDb);
console.log("pendingfromDB:", pendingfromDB);
  const handleUnitScore = ({ value }: { value: number }) => {
    setOverallScore((prev) => prev + value);
  };
  useEffect(() => {
    // Get data from AI or DB
    const actualData = datafromAI?.data
      ? modifyAIDataforRoadMap(datafromAI.data)
      : datafromDb?.data;
    // Only proceed if actualData exists and is an array
    if (!actualData || !Array.isArray(actualData) || actualData.length === 0) {
      setOriginalContents([]);
      setOverallLength(0);
      dispatch(setRoadMapItems([]));
      return;
    }
    setOriginalContents(actualData);
    const tempTotalLength = useOverallLength(actualData);
    setOverallLength(tempTotalLength);
    dispatch(setRoadMapItems(actualData));
  }, [datafromAI, datafromDb, dispatch]);
  useEffect(() => {
    if (!originalContents) return;
    setShowRoadMapAction(hasChanged);
  }, [contents, originalContents]);
  const contentsToRender = contents ?? originalContents;
  const score = Math.floor((overallScore / overallLength) * 100);
  const cancelTopicChange = () => {
    setAddTopic(false);
  };
  const SaveRoadMapItems = () => {
    dispatch(setJobTitles({ title: jobTitle, score: overallScore }));
  };
  const isLoadingAI = pendingfromAI && shouldFetchfromAI;
  const isLoadingDb = pendingfromDB && shouldFetchfromDB;
  if (isLoadingAI || isLoadingDb) {
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
      {showRoadMapAction && <SaveAction onClick={SaveRoadMapItems} />}
    </div>
  );
};
export default Roadmap;
