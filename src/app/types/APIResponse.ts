import { AxiosError, isAxiosError } from "axios";
interface BaseResponse{
  message:string,
  status:number,
  success:boolean,
  data:any;
}
export interface APIResponseSuccess<T> extends BaseResponse {
  success:true,
  data: T;
}
export interface APIResponseError extends BaseResponse {
  success:false,
  data:undefined
}
export const returnErrorObject = (error: unknown):BaseResponse => {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string };
    return {
      success: false,
      status: error.response?.status ?? 500,
      message: data?.message || error.message || "Axios Error Occurred",
      data:undefined
    };
  } else {
    return {
      success: false,
      status: 500,
      message: "Unknown Error Occurred",
      data:undefined
    };
  }
};
export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError;
