import { config } from "../config/envConfiguration";
import { JobBaseDetail } from "../types/jobDetails";
import axios from 'axios'
export const getJobOverview=async(jobtitle:string):Promise<JobBaseDetail>=>{
    try {
      const response = await axios.post(`${config.websiteUrl}/api/jobdetails`,{jobtitle});
      return response.data;
    } catch (error) {
        return {
            jobTitle:'',
            jobDescription:'',
            keyResponsibilities:['','','']
        }
    }
}