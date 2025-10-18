import { authChannel } from "@/app/config/authChannel"
import { setToast } from "@/app/redux/toastSlice"
import { clearUserDetails, setUserDetails } from "@/app/redux/userDetailsSlice"
import { APIResponse, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse"
import { UserState } from "@/app/types/userState"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useDispatch } from "react-redux"
export const useLogin = () => {
    const dispatch = useDispatch()
    return useMutation({
        mutationFn: async () => {
            const response = await axios.get('/api/userId')
            return response.data;
        },
        onSuccess: (response: APIResponse<UserState>) => {
            if (response.success) {
                dispatch(setUserDetails(response.data))
                authChannel?.postMessage({ type: "login" });
            }
        },
        onError: (error) => {
            return returnErrorObject(error)
        }
    })
}