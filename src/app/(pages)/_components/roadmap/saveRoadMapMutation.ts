import { setToast } from "@/app/redux/toastSlice";
import { setJobTitles } from "@/app/redux/userDetailsSlice";
import { APIResponse, returnErrorObject } from "@/app/types/APIResponse";
import { ContentUIType, IRoadMapContentsDBType } from "@/app/types/roadmapTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
export const useSaveRoadMapMutation = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    return useMutation<
        APIResponse<IRoadMapContentsDBType>,
        Error,
        { data: ContentUIType[]; jobTitle: string; score: number }
    >({
        mutationFn: async ({ data, jobTitle, score }) => {
            // Step 1: Save roadmap
            const saveResponse = await axios.post<APIResponse<IRoadMapContentsDBType>>(
                `/api/dbcontents?jobtitle=${jobTitle}`,
                data,
                { validateStatus: (status) => status >= 200 && status < 500 }
            );
            if (!saveResponse.data.success) {
                throw new Error(saveResponse.data.message);
            }
            // Step 2: Update user only after roadmap success
            const userResponse = await axios.post<APIResponse<any>>('/api/updateuser', {
                jobTitle,
                score,
            });
            if (!userResponse.data.success) {
                throw new Error(userResponse.data.message);
            }
            return saveResponse.data; // Final response from roadmap save
        },
        onSuccess: (response, variables) => {
            const { jobTitle, score } = variables;
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
            dispatch(setJobTitles({ title: jobTitle, score }));
            dispatch(setToast({ toastType: 'success', message: response.message }));
        },
        onError: (error) => {
            dispatch(setToast({ toastType: 'error', message: error.message }));
            returnErrorObject(error);
        },
    });
};
