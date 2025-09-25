import { APIResponse, returnErrorObject } from "@/app/types/APIResponse";
import axios from "axios";
export const getJobDetails= async<T>(url:string):Promise<APIResponse<T>>=>{
try {
    const response = await axios.get(`${url}`);
return response.data
} catch (error) {
  return returnErrorObject(error)
}
}
