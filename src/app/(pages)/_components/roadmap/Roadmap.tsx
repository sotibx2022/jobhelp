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
import { EditButton, Loading } from "@/app/_components";
import AddButton from "@/app/_components/structures/AddButton";
import ViewButton from "@/app/_components/structures/ViewButton";
import SkletonRoadmapPage from "@/app/_components/structures/skleton/SkletonRoadmapPage";
import SingleRoadMap from "./SingleRoadMap";
import AddTopic from "./AddTopic";
import SaveAction from "./SaveAction";
import { SingleJobTitle } from "@/app/types/userAuth";
import { modifyAIDataforRoadMap } from "./modifyAIDataforRoadmap";
import { setJobTitles } from "@/app/redux/userDetailsSlice";
import { useOverallScore } from "./useOverallLength";
import { setToast } from "@/app/redux/toastSlice";
import { useRouter } from "next/navigation";
import { useSaveRoadMapMutation } from "./saveRoadMapMutation";
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const contents = useSelector((state: RootState) => state.roadmapDetails);
  const [score, setScore] = useState(useOverallScore(contents.roadmapContents));
  useEffect(() => {
    setScore(useOverallScore(contents.roadmapContents));
  }, [contents]);
  const [edit, setEdit] = useState(false);
  const saveRoadMapDetails = useSaveRoadMapMutation()
  const [addTopic, setAddTopic] = useState(false);
  const [originalContents, setOriginalContents] = useState<ContentUIType[] | null>(null);
  const hasChanged = JSON.stringify(contents) !== JSON.stringify(originalContents);
  const [showRoadMapAction, setShowRoadMapAction] = useState<boolean>(hasChanged);
  const user = useSelector((state: RootState) => state.user);
  const isThereSavedJobTitleinDB = user.user?.jobTitles?.some(
    (item: SingleJobTitle) => item.title === jobTitle
  );
  const { data: datafromAI, isPending: pendingfromAI } = useQuery<APIResponse<ContentsType>>({
    queryKey: ["jobContentfromAI", jobTitle],
    queryFn: () => getJobDetails<ContentsType>(`/api/contents?jobtitle=${jobTitle}`),
    enabled: Boolean(!isThereSavedJobTitleinDB),
  });
  const { data: datafromDb, isPending: pendingfromDB } = useQuery<APIResponse<ContentUIType[]>>({
    queryKey: ['jobContentfromDB', jobTitle],
    queryFn: () => getJobDetails<ContentUIType[]>(`/api/dbcontents?jobtitle=${jobTitle}`),
    enabled: Boolean(isThereSavedJobTitleinDB),
  });
  useEffect(() => {
    if (!jobTitle) {
      if (contents.jobTitle) {
        router.replace(`/roadmap?jobtitle=${contents.jobTitle}`);
      } else {
        const storedTitle = localStorage.getItem('jobTitle');
        if (storedTitle) {
          const title = JSON.parse(storedTitle);
          router.replace(`/roadmap?jobtitle=${title}`);
        } else {
          router.push('/');
        }
      }
    }
  }, [jobTitle, contents.jobTitle, router]);
  useEffect(() => {
    const actualData = datafromAI?.data
      ? modifyAIDataforRoadMap(datafromAI.data)
      : datafromDb?.data;
    if (!actualData || !Array.isArray(actualData) || actualData.length === 0) {
      return;
    }
    if (!contents || contents.roadmapContents.length === 0) {
      dispatch(setRoadMapItems({ jobTitle: jobTitle, roadmapContents: actualData }));
      setOriginalContents(actualData);
    }
  }, [datafromAI, datafromDb, dispatch]);
  useEffect(() => {
    if (!originalContents) return;
    setShowRoadMapAction(hasChanged);
  }, [contents, originalContents]);
  const cancelTopicChange = () => {
    setAddTopic(false);
  };
  const SaveRoadMapItems = () => {
    if (user) {
      saveRoadMapDetails.mutate({data:contents.roadmapContents,jobTitle,score})
    } else {
      dispatch(setToast({ toastType: 'info', message: 'Pleaes Login to Save the Progress' }));
      router.push('/login')
    }
  };
  const isLoadingAI = pendingfromAI && !isThereSavedJobTitleinDB;
  const isLoadingDb = pendingfromDB && isThereSavedJobTitleinDB;
  if (isLoadingAI || isLoadingDb) {
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
          defaultValue={contents.roadmapContents.map((_, index) => `item-${index}`)}
          className="w-full"
        >
          {contents?.roadmapContents.map((content: ContentUIType, index: number) => (
            <SingleRoadMap
              index={index}
              content={content}
              key={index}
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
