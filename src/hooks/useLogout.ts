import { getAuthChannel } from "@/app/config/authChannel"
import { setToast } from "@/app/redux/toastSlice"
import { clearUserDetails } from "@/app/redux/userDetailsSlice"
import { APIResponse, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Variable } from "lucide-react"
import { useDispatch } from "react-redux"
interface LogoutVariables {
    skipBroadcast?: boolean;
}
export const useLogout = () => {
    const authChannel = getAuthChannel();
    const dispatch = useDispatch()
    return useMutation<APIResponse<undefined>, unknown, LogoutVariables>({
        mutationFn: async () => {
            const response = await axios.get('/api/logout')
            return response.data;
        },
        onSuccess: (response: APIResponse<undefined>, variables: LogoutVariables) => {
            dispatch(setToast({
                toastType: `${response.success ? 'success' : 'error'}`,
                message: response.message
            }))
            if (response.success) {
                if (!variables.skipBroadcast) {
                    authChannel?.postMessage("logout");
                }
                dispatch(clearUserDetails())
            }
        },
        onError: (error) => {
            return returnErrorObject(error)
        }
    })
}