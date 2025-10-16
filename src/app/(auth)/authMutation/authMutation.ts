import { response } from "@/app/api/apiFuncations/returnResponse";
import { DisplayContext } from "@/app/context/DisplayComponent";
import { setToast } from "@/app/redux/toastSlice";
import { APIResponseError, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse";
import { UserRegisterData, UserLoginData, UserResetData } from "@/app/types/userAuth";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useDispatch } from "react-redux";
type authPostData = UserRegisterData | UserLoginData | UserResetData
export const authMutation = (action: string) => {
    const dispatch = useDispatch()
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
        mutationFn: async (postData:authPostData) => {
            const response = await axios.post(`${returnAuthPostURL()}`, { ...postData });
            return response.data;
        }, onSuccess: (response: APIResponseSuccess<undefined> | APIResponseError) => {
            if(response.success){
                dispatch(setToast({toastType:'success',message:response.message}))
            }else{
                dispatch(setToast({toastType:'error',message:response.message}))
            }
        }, onError: (error) => {
            returnErrorObject(error)
        }
    })
}