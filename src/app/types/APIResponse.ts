import { AxiosError } from "axios";
export interface APIResponseSuccess<T> {
  data?: T;
  message: string;
  status: number;
  success: true;
}
export interface APIResponseError {
  message: string;
  status: number;
  success: false;
}
interface UnknownError{
    message:"Unknown error occured",
    status:500,
    success:false,
}
export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError;
type QueryError = UnknownError | AxiosError
export type APIResult<T> = APIResponse<T> | QueryError;
