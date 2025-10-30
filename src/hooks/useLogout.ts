import { getAuthChannel } from "@/app/config/authChannel"
import { clearRoadMapItems } from "@/app/redux/roadmapSlice"
import { setToast } from "@/app/redux/toastSlice"
import { clearUserDetails } from "@/app/redux/userDetailsSlice"
import { APIResponse, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Variable } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
interface LogoutVariables {
    skipBroadcast?: boolean;
}
export const useLogout = () => {
    const router = useRouter()
    const authChannel = getAuthChannel();
    const dispatch = useDispatch()
    return useMutation<APIResponse<undefined>, unknown, LogoutVariables>({
        mutationFn: async () => {
            const response = await axios.get('/api/logout')
            return response.data;
        },
        onSuccess: (response: APIResponse<undefined>, variables: LogoutVariables) => {
            if (response.success) {
                dispatch(clearUserDetails())
                router.refresh()
                dispatch(clearRoadMapItems())
                if (!variables.skipBroadcast) {
                    authChannel?.postMessage("logout");
                }
                dispatch(setToast({
                    toastType: "success",
                    message: response.message
                }))
            } else {
                dispatch(setToast({
                    toastType: "error",
                    message: response.message
                }))
            }
        },
        onError: (error) => {
            return returnErrorObject(error)
        }
    })
}