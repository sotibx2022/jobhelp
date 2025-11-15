"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { DeleteButton, EditButton, Loading } from "@/app/_components";
import ViewButton from "@/app/_components/structures/ViewButton";
import { useRouter } from "next/navigation";
import { ButtonGroup, } from "@/components/ui/button-group"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { APIResponse } from "@/app/types/APIResponse";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/app/redux/toastSlice";
import { User } from "lucide-react";
import { RootState } from "@/app/redux/store";
import { deleteJobTitle } from "@/app/redux/userDetailsSlice";
import { removeJobDetails, setJobDetails } from "@/app/redux/jobdetailsSlice";
import { clearRoadMapItems } from "@/app/redux/roadmapSlice";
interface ProgressCardProps {
  jobTitle: string;
  score: number;
  editValue?: boolean;
  setEditChild?: (value: boolean) => void;
  editable: boolean;
  userToken?: string;
  readOnly?: boolean;
}
const ProgressCard: React.FC<ProgressCardProps> = ({
  jobTitle,
  score,
  editValue,
  setEditChild,
  editable,
  userToken,
  readOnly
}) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [editRoadMap, setEditRoadmap] = useState(editValue ? editValue : false);
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.user)
  useEffect(() => {
    if (setEditChild) {
      setEditChild(editRoadMap)
    }
  }, [editRoadMap])
  function redirectToRoadMap(): void {
    if (userToken) {
      router.push(`/shared/roadmap?usertoken=${userToken}&jobtitle=${jobTitle}`)
    } else {
      router.push(`/roadmap?jobtitle=${jobTitle}`)
      dispatch(setJobDetails({jobTitle}))
    }
  }
  const deleteRoadMapMutation = useMutation({
    mutationFn: async ({ jobTitle, userId }: { jobTitle: string; userId: string }) => {
      const response = await axios.post('/api/deletedbcontent', { jobTitle, userId })
      return response.data;
    }, onSuccess: (response: APIResponse<undefined>) => {
      if (response.success) {
        dispatch(setToast({ toastType: 'success', message: response.message }))
        dispatch(deleteJobTitle(jobTitle))
        queryClient.invalidateQueries({ queryKey: ['userDetails'] })
      } else {
        dispatch(setToast({ toastType: 'error', message: response.message }))
        dispatch(clearRoadMapItems())
      }
    }
  })
  function deleteRoadMapItem(): void {
    deleteRoadMapMutation.mutate({ jobTitle, userId: user!._id });
    dispatch(removeJobDetails(""))
  }
  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      {deleteRoadMapMutation.isPending && <Loading />}
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="secondaryHeading capitalize">{jobTitle}</h2>
        <div className="flex items-center gap-2">
          <h2 className="secondaryHeading capitalize">Progress</h2>
          <Badge variant="destructive">{score}%</Badge>
        </div>
        {!readOnly && (
          <div className="flex items-center gap-2">
            {!editable ? (
              <div className="progressActions">
                <ButtonGroup>
                  <ViewButton onClick={redirectToRoadMap} />
                  <DeleteButton onClick={deleteRoadMapItem} />
                </ButtonGroup>
              </div>
            ):null}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ProgressBar value={score} className="h-2 mt-2" />
      </CardContent>
    </Card>
  );
};
export default ProgressCard;
