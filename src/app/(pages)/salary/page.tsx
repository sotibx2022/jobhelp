import { config } from "@/app/config/envConfiguration";
import { getJobDetails } from "@/app/functions/queryFunctions/getJobDetails";
import { jobSalaryType } from "@/app/types/jobSalary";
import { Salary } from "../_components";
import { getQueryClient } from "@/hooks/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
interface ISearchParams {
  searchParams: Promise<{
    jobtitle: string;
    country: string;
  }>;
}
// Function to generate metadata
export async function generateMetadata({ searchParams: mySearchParams }: ISearchParams) {
  const searchParams = await mySearchParams;
  const jobTitle = searchParams.jobtitle;
  const country = searchParams.country;
  const urlToFetchSalary = `${config.websiteUrl}/api/salary?jobtitle=${jobTitle}&country=${country}`;
  try {
    const jobSalaryData = await getJobDetails<jobSalaryType>(urlToFetchSalary);
    if (jobSalaryData.success && jobSalaryData.data?.salaryByExperience) {
      const { intern, junior, mid, senior, expert, currency } = jobSalaryData.data.salaryByExperience;
      return {
        title: `JobRise | Salary of ${jobTitle} in ${country}`,
        description: `Discover the salary range for a ${jobTitle} in ${country}. 
Starting from ${intern} ${currency} for interns, ${junior} ${currency} for junior-level, ${mid} ${currency} for mid-level, ${senior} ${currency} for senior-level, to ${expert} ${currency} for expert-level professionals.`,
      };
    } else {
      return {
        title: `Error fetching salary data for ${jobTitle}`,
        description: jobSalaryData.message || "Unable to fetch salary data at this time.",
      };
    }
  } catch (error) {
    return {
      title: `Error fetching salary data for ${jobTitle}`,
      description: "An unexpected error occurred while generating metadata.",
    };
  }
}
// React / Next.js page component
const Page = async ({ searchParams: mySearchParams }: ISearchParams) => {
  const searchParams = await mySearchParams;
  const jobTitle = searchParams.jobtitle;
  const country = searchParams.country;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey:['jobSalaryDetails',jobTitle,country],
    queryFn:()=> getJobDetails<jobSalaryType>(
    `${config.websiteUrl}/api/salary?jobtitle=${jobTitle}&country=${country}`)})
    const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
    <Salary jobTitle={jobTitle} country={country}/>
    </HydrationBoundary>
  );
};
export default Page;
