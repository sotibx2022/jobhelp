import { response } from "@/app/api/apiFuncations/returnResponse";
import { APIResponseError, APIResponseSuccess, returnErrorObject } from "@/app/types/APIResponse";
import { UserRegisterData, UserLoginData, UserResetData } from "@/app/types/userAuth";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
type authPostData = UserRegisterData | UserLoginData | UserResetData
export const authMutation = (action: string) => {
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
            alert(response.message)
        }, onError: (error) => {
            returnErrorObject(error)
        }
    })
}