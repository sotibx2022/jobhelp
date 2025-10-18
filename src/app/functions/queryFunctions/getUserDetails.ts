import { APIResponse, returnErrorObject } from "@/app/types/APIResponse";
import { UserState } from "@/app/types/userState";
import axios from "axios";
export const getUserDetails = async (): Promise<APIResponse<UserState>> => {
    try {
      const response = await axios.get('/api/userId');
      return response.data;
    } catch (error) {
      return returnErrorObject(error)
    }
  }