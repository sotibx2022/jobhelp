import { CommonFooter, PagesHeader } from '@/app/_components'
import { getJobOverview } from '@/app/functions/queryFunction';
import { getQueryClient } from '@/hooks/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import { Overview } from '../_components';
import { Metadata } from 'next';
interface ISearchParams {
  searchParams: Promise<{
    jobtitle?: string,
  }>
}
export async function generateMetadata({ searchParams: mySearchParams }: ISearchParams): Promise<Metadata> {
  const searchParams = await mySearchParams;
  const jobtitle = searchParams.jobtitle;
  let jobOverview;
  try {
    jobOverview = await getJobOverview(jobtitle!);
  } catch {
    // error silently handled
  }
  const { jobTitle, jobDescription } = jobOverview || {};
  if (jobTitle && jobDescription) {
    return {
      title: jobTitle,
      description: jobDescription,
    };
  } else {
    return {
      title: `Error for ${jobtitle}`,
      description: 'Error to generate the basic job overview details from the provided job title',
    };
  }
}
const page = async ({ searchParams: mySearchParams }: ISearchParams) => {
  const searchParams = await mySearchParams;
  const jobtitle = searchParams.jobtitle;
  const queryClient = getQueryClient();
  if (jobtitle) {
    await queryClient.prefetchQuery({
      queryKey: ['jobBaseDetails', jobtitle],
      queryFn: () => getJobOverview(jobtitle),
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
