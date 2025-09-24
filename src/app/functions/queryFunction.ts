import { config } from "../config/envConfiguration";
import { JobBaseDetail } from "../types/jobDetails";
import axios from 'axios'
export const getJobOverview = async (jobtitle: string): Promise<JobBaseDetail> => {
    try {
        const response = await axios.get(`${config.websiteUrl}/api/overview?jobtitle=${jobtitle}`,);
        return response.data;
    } catch (error) {
        return {
            jobTitle: '',
            jobDescription: '',
            keyResponsibilities: ['', '', '']
        }
    }
}