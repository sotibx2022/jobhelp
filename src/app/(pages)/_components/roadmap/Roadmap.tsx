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
import { Accordion } from "@/components/ui/accordion";
import SingleRoadMap from "./SingleRoadMap";
import AddTopic from "./AddTopic";
import AddButton from "@/app/_components/structures/AddButton";
import SaveAction from "./SaveAction";
import ProgressCard from "@/app/(dashboard)/profile/Progress";
import { useFallBackJobTitle } from "@/hooks/useFallBackJobTitle";
const Roadmap: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contents: RoadMapState = useSelector((state: RootState) => state.roadmapDetails);
  const user = useSelector((state: RootState) => state.user);
  const { data, isPending } = useFetchRoadMapItems(user, jobTitle);
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
  // Redirect logic if jobTitle is missing
  useFallBackJobTitle(jobTitle)
  const handleEditValue =(value:boolean) =>{
    console.log(value);
    setEdit(value)
  }
  // Populate Redux store with fetched roadmap data once ready
  useEffect(() => {
    if (data && contents?.roadMapContents?.length === 0) {
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
    if (user?.initialized || isPending || contents?.roadMapContents?.length === 0) {
    } else {
    }
  }, [contents, isPending, user]);
  // Render skeleton until data + user are ready
  if (!user.initialized || isPending || contents?.roadMapContents?.length === 0) {
    return <SkletonRoadmapPage />;
  }
  return (
    <div className="w-full">
      {saveRoadMapDetails.isPending && <Loading />}
      <ProgressCard jobTitle={jobTitle} score={score} setEditChild={handleEditValue} editValue={true} editable={true} />
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
