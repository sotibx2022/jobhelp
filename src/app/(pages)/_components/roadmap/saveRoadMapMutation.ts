import { setToast } from "@/app/redux/toastSlice"
import { setJobTitles } from "@/app/redux/userDetailsSlice"
import { APIResponse, returnErrorObject } from "@/app/types/APIResponse"
import { ContentUIType, IRoadMapContentsDBType } from "@/app/types/roadmapTypes"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useDispatch } from "react-redux"
export const saveRoadMapMutation = (jobTitle:string,score:number) => {
    const dispatch = useDispatch()
    return useMutation<APIResponse<IRoadMapContentsDBType>, Error, ContentUIType[]>({
        mutationFn: async (data: ContentUIType[]) => {
            const response = await axios.post(`/api/dbcontents?jobtitle=${jobTitle}`);
            return response.data;
        },
        onSuccess: (response:APIResponse<IRoadMapContentsDBType>) => {
            if (response.success) {
                dispatch(setJobTitles({ title:jobTitle, score: score }));
                dispatch(setToast({ toastType: 'success', message: response.message }))
            } else {
                dispatch(setToast({ toastType: 'error', message: response.message }))
            }
        }, onError: (error) => {
            return returnErrorObject(error)
        }
    })
}