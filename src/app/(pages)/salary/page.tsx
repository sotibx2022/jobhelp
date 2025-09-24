import React from 'react'
import { generateMetadata } from '../overview/page'
import { Metadata } from 'next'
import { getSalaryDetails } from '@/app/functions/queryFunctions/getSalaryDetails'
import { title } from 'process'
interface ISearchParams {
    searchParams: Promise<{
        jobtitle: string,
        country: string
    }>
}
// export async function generateMetadata({ searchParams: mySearchParams }: ISearchParams):Promise<Metadata>{
//     const searchParams = await mySearchParams;
//     const jobTitle = searchParams.jobtitle;
//     const country = searchParams.country;
//     const jobSalaryData = await getSalaryDetails(jobTitle,country);
//     console.log(jobSalaryData)
//     try {
//       return {
//         title:jobTitle
//         description:`Discover the salary range for a ${salaryData.jobTitle} in ${salaryData.country}. Starting from ${salaryData.salaryByExperience.intern} ${salaryData.salaryByExperience.currency} for interns to ${salaryData.salaryByExperience.expert} ${salaryData.salaryByExperience.currency} for expert-level professionals, with junior, mid, and senior levels in between.`
//       }  
//     } catch (error) {
//         return {title:
//         description:}
//     }
// }
const page = async ({ searchParams: mySearchParams }: ISearchParams) => {
    const searchParams = await mySearchParams;
    const jobTitle = searchParams.jobtitle;
    const country = searchParams.country;
    const jobSalaryData = await getSalaryDetails(jobTitle, country);
  console.log(jobSalaryData);
}
    return (
        <div>
            {jobTitle}
            {country}
        </div>
    )
}
export default page