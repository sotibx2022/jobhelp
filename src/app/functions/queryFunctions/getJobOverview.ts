import { config } from '@/app/config/envConfiguration';
import { JobBaseDetail } from '@/app/types/jobDetails';
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