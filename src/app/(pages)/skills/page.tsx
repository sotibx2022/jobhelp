import { config } from '@/app/config/envConfiguration';
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails';
import { skillsType } from '@/app/types/skillTypes';
import { getQueryClient } from '@/hooks/getQueryClient';
import { dehydrate, hydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { title } from 'process';
import React from 'react'
interface ISearchParams {
  searchParams: Promise<{
    jobtitle: string
  }>
}
export async function generateMetadata({ searchParams: mySearchParams }: ISearchParams): Promise<Metadata> {
  const searchParams = await mySearchParams;
  const jobTitle = searchParams.jobtitle;
  const urlforSkills = `${config.websiteUrl}/api/skills?jobtitle=${jobTitle}`
  const jobSkillsData = await getJobDetails<skillsType>(urlforSkills)
  if (jobSkillsData?.data?.RoleSkills) {
    const { Fundamentals, TechnicalSkills, ToolsAndTechnologies, ProcessesAndMethods, DataAndAnalytics, SoftSkills, RegulatoryAndCompliance } = jobSkillsData.data?.RoleSkills
    const metaDescription = `Key skills for a ${jobTitle} include ${Fundamentals.join(", ")}, ${TechnicalSkills.join(", ")}, ${ToolsAndTechnologies.join(", ")}, ${ProcessesAndMethods.join(", ")}, ${DataAndAnalytics.join(", ")}, ${SoftSkills.join(", ")}, and ${RegulatoryAndCompliance.join(", ")}.`;
    return {
      title: `Required Skills for ${jobTitle}`,
      description: metaDescription
    }
  } else {
    return {
      title: `Error to Fetch Skills for ${jobTitle}`,
      description: `There is something went wrong to fetch the meta data description for the provided job title which is ${jobTitle}`
    }
  }
}
const page: React.FC<ISearchParams> = async ({ searchParams: mySearchParams }: ISearchParams) => {
  const searchParams = await mySearchParams;
  const jobTitle = searchParams.jobtitle;
  const urlforSkills = `${config.websiteUrl}/api/skills?jobtitle=${jobTitle}`
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['jobTitle', jobTitle],
    queryFn: () => getJobDetails<skillsType>(urlforSkills)
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div>{jobTitle}</div>
    </HydrationBoundary>
  )
}
export default page