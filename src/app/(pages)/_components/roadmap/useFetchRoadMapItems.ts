import { APIResponse } from "@/app/types/APIResponse";
import { ContentUIType } from "@/app/types/roadmapTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { modifyAIDataforRoadMap } from "./modifyAIDataforRoadmap";
import { UserSliceState } from "@/app/redux/userDetailsSlice";
import { SingleJobTitle } from "@/app/types/userAuth";
const fetchRoadMapItems = async (
  user: UserSliceState,
  jobTitle: string
): Promise<ContentUIType[]|undefined> => {
    const isThereSavedJobTitleinDB = user.user?.jobTitles?.some(
        (item: SingleJobTitle) => item.title === jobTitle
      );
      console.log(user)
  if (isThereSavedJobTitleinDB) {
    const response = await axios.get<APIResponse<ContentUIType[]>>(
      `/api/dbcontents?jobtitle=${jobTitle}`
    );
    if(response.data){
        return response.data.data
    }
  } else {
    const response = await axios.get<APIResponse<any>>(
      `/api/contents?jobtitle=${jobTitle}`
    );
    const actualData = modifyAIDataforRoadMap(response.data.data);
    return actualData;
  }
};
export const useFetchRoadMapItems = (
  user: UserSliceState,
  jobTitle: string
) => {
  return useQuery<ContentUIType[]|undefined>({
    queryKey: ['roadmapItems', jobTitle],
    queryFn: () => fetchRoadMapItems(user, jobTitle),
    enabled: !!jobTitle,
    select: (data) => data ?? [], // ✅ ensures data is never undefined
  });
};
