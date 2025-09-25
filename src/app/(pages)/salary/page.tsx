import { config } from "@/app/config/envConfiguration";
import { getJobDetails } from "@/app/functions/queryFunctions/getJobDetails";
import { jobSalaryType } from "@/app/types/jobSalary";
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
  const urlToFetchSalary = `${config.websiteUrl}/salary?jobtitle=${jobTitle}&country=${country}`;
  try {
    const jobSalaryData = await getJobDetails<jobSalaryType>(urlToFetchSalary);
    if (jobSalaryData.success && jobSalaryData.data?.salaryByExperience) {
      const { intern, junior, mid, senior, expert, currency } = jobSalaryData.data.salaryByExperience;
      return {
        title: jobTitle,
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
  // Fetch salary data if needed
  const jobSalaryData = await getJobDetails<jobSalaryType>(
    `${config.websiteUrl}/salary?jobtitle=${jobTitle}&country=${country}`
  );
  return (
    <div>
      <p>Job Title: {jobTitle}</p>
      <p>Country: {country}</p>
      {jobSalaryData.success && jobSalaryData.data?.salaryByExperience && (
        <div>
          <p>Intern: {jobSalaryData.data.salaryByExperience.intern} {jobSalaryData.data.salaryByExperience.currency}</p>
          <p>Junior: {jobSalaryData.data.salaryByExperience.junior} {jobSalaryData.data.salaryByExperience.currency}</p>
          <p>Mid: {jobSalaryData.data.salaryByExperience.mid} {jobSalaryData.data.salaryByExperience.currency}</p>
          <p>Senior: {jobSalaryData.data.salaryByExperience.senior} {jobSalaryData.data.salaryByExperience.currency}</p>
          <p>Expert: {jobSalaryData.data.salaryByExperience.expert} {jobSalaryData.data.salaryByExperience.currency}</p>
        </div>
      )}
    </div>
  );
};
export default Page;
