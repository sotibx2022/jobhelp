import { config } from '@/app/config/envConfiguration';
import { getJobDetails } from '@/app/functions/queryFunctions/getJobDetails';
import { skillsType } from '@/app/types/skillTypes';
import { getQueryClient } from '@/hooks/getQueryClient';
import { dehydrate, hydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { title } from 'process';
import React from 'react'
import Skills from '../_components/Skills';
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
   const {
  FundaMental_Skills,
  Technical_Skills,
  Tool_Skills,
  Process_Skills,
  Analytics_Skills,
  Soft_Skills,
  Compliance_Skills,
} = jobSkillsData.data?.RoleSkills || {}
    const metaDescription = `Key skills for a ${jobTitle} include ${FundaMental_Skills.join(", ")}, ${Technical_Skills.join(", ")}, ${Tool_Skills.join(", ")}, ${Process_Skills.join(", ")}, ${Analytics_Skills.join(", ")}, ${Soft_Skills.join(", ")}, and ${Compliance_Skills.join(", ")}.`;
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
    queryKey: ['skills', jobTitle],
    queryFn: () => getJobDetails<skillsType>(urlforSkills)
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Skills jobTitle={jobTitle}/>
    </HydrationBoundary>
  )
}
export default page