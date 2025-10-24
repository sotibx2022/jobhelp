"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { RoadMapState, setRoadMapItems } from "@/app/redux/roadmapSlice";
import { setToast } from "@/app/redux/toastSlice";
import { useRouter } from "next/navigation";
import { ContentUIType } from "@/app/types/roadmapTypes";
import { useOverallScore } from "./useOverallLength";
import { useSaveRoadMapMutation } from "./saveRoadMapMutation";
import { useFetchRoadMapItems } from "./useFetchRoadMapItems";
import SkletonRoadmapPage from "@/app/_components/structures/skleton/SkletonRoadmapPage";
import { EditButton, Loading } from "@/app/_components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ViewButton from "@/app/_components/structures/ViewButton";
import { Progress } from "@/components/ui/progress";
import { Accordion } from "@/components/ui/accordion";
import SingleRoadMap from "./SingleRoadMap";
import AddTopic from "./AddTopic";
import AddButton from "@/app/_components/structures/AddButton";
import SaveAction from "./SaveAction";
import { dataTagErrorSymbol } from "@tanstack/react-query";
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contents: RoadMapState = useSelector((state: RootState) => state.roadmapDetails);
  const user = useSelector((state: RootState) => state.user);
  // React Query + fetch only after user is initialized
  const { data, isPending } = useFetchRoadMapItems(user, jobTitle);
  // State for progress score
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(useOverallScore(contents.roadMapContents));
  }, [contents]);
  const [edit, setEdit] = useState(false);
  const saveRoadMapDetails = useSaveRoadMapMutation();
  const [addTopic, setAddTopic] = useState(false);
  const [originalContents, setOriginalContents] = useState<RoadMapState | null>(null);
  const hasChanged = JSON.stringify(contents) !== JSON.stringify(originalContents);
  const [showRoadMapAction, setShowRoadMapAction] = useState<boolean>(hasChanged);
  console.log(contents.roadMapContents);
  // Redirect logic if jobTitle is missing
  useEffect(() => {
    if (!jobTitle) {
      const fallbackTitle = contents.jobTitle || JSON.parse(localStorage.getItem('jobTitle') || 'null');
      if (fallbackTitle) {
        router.replace(`/roadmap?jobtitle=${fallbackTitle}`);
      } else {
        router.push('/');
      }
    }
  }, [jobTitle, contents.jobTitle, router]);
  // Populate Redux store with fetched roadmap data once ready
  console.log(data)
  console.log(contents)
  useEffect(() => {
    if (data && contents?.roadMapContents?.length === 0) {
      console.log(contents)
      console.log("i am inside to set redux")
      console.log("data to set in redux is", data);
      dispatch(setRoadMapItems(data));
      setOriginalContents(data);
    }
  }, [data, dispatch, contents, jobTitle]);
  // Detect changes for showing SaveAction
  useEffect(() => {
    if (!originalContents) return;
    setShowRoadMapAction(hasChanged);
  }, [contents, originalContents, hasChanged]);
  const cancelTopicChange = () => setAddTopic(false);
  const SaveRoadMapItems = () => {
    if (user.initialized && user.user) {
      saveRoadMapDetails.mutate({ data: contents.roadMapContents, jobTitle, score });
    } else {
      dispatch(setToast({ toastType: 'info', message: 'Please login to save your progress' }));
      router.push('/login');
    }
  };
  useEffect(() => {
    console.log("===== Roadmap Debug =====");
    console.log("user:", user);
    console.log("user.initialized:", user?.initialized);
    console.log("isPending:", isPending);
    console.log("contents:", contents);
    console.log("contents?.roadMapContents?.length:", contents?.roadMapContents?.length);
    if (user?.initialized || isPending || contents?.roadMapContents?.length === 0) {
      console.log("pending state");
    } else {
      console.log("active state");
    }
  }, [contents, isPending, user]);
  // Render skeleton until data + user are ready
  if (!user.initialized || isPending || contents?.roadMapContents?.length === 0) {
    return <SkletonRoadmapPage />;
  }
  return (
    <div className="w-full">
      {saveRoadMapDetails.isPending && <Loading />}
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
          defaultValue={contents?.roadMapContents?.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {contents?.roadMapContents?.map((content: ContentUIType, index: number) => (
            <SingleRoadMap key={index} index={index} content={content} edit={edit} />
          ))}
          {edit && (addTopic ? (
            <AddTopic defaultValue="Add New Topic" cancelTopicChange={cancelTopicChange} action="add" />
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
