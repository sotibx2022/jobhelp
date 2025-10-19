import { response } from "@/app/api/apiFuncations/returnResponse";
import { DisplayContext } from "@/app/context/DisplayComponent";
import { setToast } from "@/app/redux/toastSlice";
import { setUserDetails } from "@/app/redux/userDetailsSlice";
import { APIResponseError, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse";
import { UserRegisterData, UserLoginData, UserResetData } from "@/app/types/userAuth";
import { useLogin } from "@/hooks/useLogin";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useDispatch } from "react-redux";
type authPostData = UserRegisterData | UserLoginData | UserResetData
export const authMutation = (action: string) => {
    const dispatch = useDispatch()
    const login = useLogin()
    const router = useRouter()
    const returnAuthPostURL = (): string => {
        switch (action) {
            case 'register':
                return '/api/register';
            case 'reset':
                return '/api/reset';
            default:
                return '/api/login';
        }
    };
    return useMutation({
        mutationFn: async (postData: authPostData) => {
            const response = await axios.post(`${returnAuthPostURL()}`, { ...postData });
            return response.data;
        }, onSuccess: (response: APIResponseSuccess<undefined> | APIResponseError) => {
            if (response.success) {
                dispatch(setToast({ toastType: 'success', message: response.message }))
                if (action === 'reset') {
                    router.push('/login')
                } else {
                    setTimeout(() => {
                        login.mutate({skipBroadcast:false})
                    }, 100)
                }
            } else {
                dispatch(setToast({ toastType: 'error', message: response.message }))
            }
        }, onError: (error) => {
            returnErrorObject(error)
        }
    })
}