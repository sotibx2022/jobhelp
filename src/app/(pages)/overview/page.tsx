import { getQueryClient } from '@/hooks/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import { Overview } from '../_components';
import { Metadata } from 'next';
import { config } from '@/app/config/envConfiguration';
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails';
import { JobBaseDetail } from '@/app/types/jobDetails';
import { APIResponse, APIResponseSuccess } from '@/app/types/APIResponse';
interface ISearchParams {
  searchParams: Promise<{
    jobtitle?: string,
  }>
}
export async function generateMetadata({ searchParams: mySearchParams }: ISearchParams): Promise<Metadata> {
  const searchParams = await mySearchParams;
  const jobtitle = searchParams.jobtitle;
  const urlToFetchJobBaseData = `${config.websiteUrl}/api/overview?jobtitle=${jobtitle}`;
  // Correct generic usage
  const jobOverview = await getJobDetails<JobBaseDetail>(urlToFetchJobBaseData);
  // Type-safe narrowing
  if (jobOverview.success && jobOverview.data) {
    const { jobTitle, jobDescription } = jobOverview.data;
    if (jobTitle && jobDescription) {
      return {
        title: jobTitle,
        description: jobDescription,
      };
    } else {
      return {
        title: `Error for ${jobtitle}`,
        description: 'Error generating basic job overview details from the provided job title',
      };
    }
  } else {
    // Handle APIResponseError
    return {
      title: `Error for ${jobtitle}`,
      description: jobOverview.message || 'Unknown error occurred',
    };
  }
}
const page = async ({ searchParams: mySearchParams }: ISearchParams) => {
  const searchParams = await mySearchParams;
  const jobtitle = searchParams.jobtitle;
  const urlToFetchJobBaseData = `${config.websiteUrl}/api/overview?jobtitle=${jobtitle}`;
  const queryClient = getQueryClient();
  if (jobtitle) {
    await queryClient.prefetchQuery({
      queryKey: ['jobBaseDetails', jobtitle],
      queryFn: () => getJobDetails<APIResponse<JobBaseDetail>>(urlToFetchJobBaseData),
    });
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Overview jobtitle={jobtitle!} />
    </HydrationBoundary>
  );
};
export default page;
