import { authChannel } from "@/app/config/authChannel"
import { setToast } from "@/app/redux/toastSlice"
import { clearUserDetails } from "@/app/redux/userDetailsSlice"
import { APIResponse, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useDispatch } from "react-redux"
export const useLogout =  () => {
    const dispatch = useDispatch()
    return useMutation({
        mutationFn: async () => {
            const response = await axios.get('/api/logout')
            return response.data;
        },
        onSuccess: (response: APIResponse<undefined>) => {
            dispatch(setToast({
                toastType: `${response.success ? 'success' : 'error'}`,
                message: response.message
            }))
            if (response.success) {
                dispatch(clearUserDetails())
                authChannel?.postMessage({ type: "logout" });
            }
        },
        onError: (error) => {
            return returnErrorObject(error)
        }
    })
}