import { config } from "@/app/config/envConfiguration";
import { APIResponseSuccess, APIResponseError, APIResult } from "@/app/types/APIResponse";
import { jobSalaryType } from "@/app/types/jobSalary";
import axios, { AxiosError, isAxiosError } from "axios";
export const getSalaryDetails = async (
  jobTitle: string,
  country: string
): Promise<APIResult<jobSalaryType>> => {
  try {
    const response = await axios.get(`${config.websiteUrl}/api/salary?jobtitle=${jobTitle}&country=${country}`);
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return error; // Return the actual AxiosError object
    } else {
      return {
        message: "Unknown error occurred",
        success: false,
        status: 500
      } as APIResponseError;
    }
  }
};
