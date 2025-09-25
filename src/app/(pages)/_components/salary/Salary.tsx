"use client";
import React from "react";
import { SelectableCountries, SalaryTrendChart, SalaryBarChart } from "../index";
import { useQuery} from "@tanstack/react-query";
import { getJobDetails } from "@/app/functions/queryFunctions/getJobDetails";
import { config } from "@/app/config/envConfiguration";
import { jobSalaryType } from "@/app/types/jobSalary";
import { APIResponse } from "@/app/types/APIResponse";
type SalaryProps = {
  jobTitle: string;
  country: string;
};
const Salary: React.FC<SalaryProps> =  ({ jobTitle, country }) => {
  const { data:salaryData } = useQuery<APIResponse<jobSalaryType>>({
  queryKey: ["jobSalaryDetails", jobTitle, country],
  queryFn: () =>
    getJobDetails<jobSalaryType>(
      `${config.websiteUrl}/api/salary?jobtitle=${jobTitle}&country=${country}`
    ),
});
  return (
    <div>
      <SelectableCountries />
    {(salaryData && salaryData.data)
  ? <SalaryTrendChart chartData={salaryData.data}/>
  : <h1>No Data</h1>
}
      {(salaryData && salaryData.data)
  ?<SalaryBarChart salaryData={salaryData.data} />
: <h1>No Data</h1>}
    </div>
  );
};
export default Salary;
