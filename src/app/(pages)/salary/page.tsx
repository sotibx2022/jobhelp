import { config } from "@/app/config/envConfiguration";
import { getJobDetails } from "@/app/functions/queryFunctions/getJobDetails";
import { jobSalaryType } from "@/app/types/jobSalary";
import { Salary } from "../_components";
import { getQueryClient } from "@/hooks/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
interface ISearchParams {
  searchParams: Promise<{
    jobtitle: string;
    country: string;
  }>;
}
const allHeaders = await headers();
  const country = allHeaders.get("x-vercel-ip-country") ?? "US";
  let finalUrl: string | null = null;
  if (country) {
    const url = new URL(process.env.NEXT_PUBLIC_WEBSITE_URL!);
    url.searchParams.set("country", country);
    finalUrl = url.toString();
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
    queryKey: ['jobSalaryDetails', jobTitle, country],
    queryFn: () => getJobDetails<jobSalaryType>(
      `${config.websiteUrl}/api/salary?jobtitle=${jobTitle}&country=${country}`)
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Salary jobTitle={jobTitle} country={country} />
    </HydrationBoundary>
  );
};
export default Page;
