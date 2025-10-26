import { APIResponse, returnErrorObject } from "@/app/types/APIResponse";
import { ContentsType, ContentUIType } from "@/app/types/roadmapTypes";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { modifyAIDataforRoadMap } from "./modifyAIDataforRoadmap";
import { UserSliceState } from "@/app/redux/userDetailsSlice";
import { SingleJobTitle } from "@/app/types/userAuth";
import { RoadMapState } from "@/app/redux/roadmapSlice";
/** ✅ Utility to create a default RoadMapState */
export const createRoadMapState = (
  jobTitle: string = "",
  roadMapContents: ContentUIType[] = []
): RoadMapState => ({
  jobTitle,
  roadMapContents,
});
/** ✅ Fetch roadmap items depending on user + jobTitle */
const fetchRoadMapItems = async (
  user: UserSliceState,
  jobTitle: string
): Promise<RoadMapState> => {
  if (!user.initialized) {
    // Safety: should never happen due to React Query's "enabled" condition
    return createRoadMapState();
  }
  const isSavedJobTitle = user.user?.jobTitles?.some(
    (item: SingleJobTitle) => item.title === jobTitle
  );
  if (isSavedJobTitle) {
    // Fetch saved roadmap from DB
    const response = await axios.get<APIResponse<RoadMapState>>(
      `/api/dbcontents?jobtitle=${jobTitle}`
    );
    return response.data?.data ?? createRoadMapState();
  } else {
    // Fetch new roadmap contents from AI-generated API
    const response = await axios.get<APIResponse<ContentsType>>(
      `/api/contents?jobtitle=${jobTitle}`
    );
    if (response.data?.data) {
      const modifiedJobContents = modifyAIDataforRoadMap(response.data.data);
      return createRoadMapState(jobTitle, modifiedJobContents);
    }
    return createRoadMapState();
  }
};
/** ✅ React Query hook for fetching roadmap items */
export const useFetchRoadMapItems = (
  user: UserSliceState,
  jobTitle: string
) => {
  const isUserReady = user?.initialized === true;
  return useQuery({
    queryKey: ["roadmapItems", jobTitle],
    queryFn: () => fetchRoadMapItems(user, jobTitle),
    enabled: !!jobTitle && isUserReady, // ✅ only fetch when user initialized
  });
};
