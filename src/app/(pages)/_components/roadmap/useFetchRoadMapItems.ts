import { APIResponse } from "@/app/types/APIResponse";
import { ContentsType, ContentUIType } from "@/app/types/roadmapTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { modifyAIDataforRoadMap } from "./modifyAIDataforRoadmap";
import { UserSliceState } from "@/app/redux/userDetailsSlice";
import { SingleJobTitle } from "@/app/types/userAuth";
import { RoadMapState } from "@/app/redux/roadmapSlice";
export const createRoadMapState = (
  jobTitle: string = "",
  roadMapContents: ContentUIType[] = []
): RoadMapState => {
  return {
    jobTitle,
    roadMapContents,
  };
};
const fetchRoadMapItems = async (
    user: UserSliceState,
    jobTitle: string
): Promise<RoadMapState | undefined> => {
    if (!user.initialized) {
        // This is just a safety; React Query should prevent calling this
        return createRoadMapState();
    }
    const isThereSavedJobTitleinDB = user.user?.jobTitles?.some(
        (item: SingleJobTitle) => item.title === jobTitle
    );
    if (isThereSavedJobTitleinDB) {
        const response = await axios.get<APIResponse<RoadMapState>>(
            `/api/dbcontents?jobtitle=${jobTitle}`
        );
        return response.data?.data ?? createRoadMapState();
    } else {
        const response = await axios.get<APIResponse<ContentsType>>(
            `/api/contents?jobtitle=${jobTitle}`
        );
        if(response.data.data){
const modifiedJobContents =  modifyAIDataforRoadMap(response.data.data)
const modifeddata = createRoadMapState(jobTitle,modifiedJobContents)
return modifeddata
        }else{
            return createRoadMapState()
        }
    }
};
export const useFetchRoadMapItems = (
    user: UserSliceState,
    jobTitle: string
) => {
    const isUserReady = user?.initialized === true;
    return useQuery<RoadMapState | undefined>({
        queryKey: ['roadmapItems', jobTitle],
        queryFn: () => fetchRoadMapItems(user, jobTitle),
        enabled: !!jobTitle && isUserReady, // ✅ only fetch when user initialized
        select: (data) => data ?? createRoadMapState(),
    });
};
