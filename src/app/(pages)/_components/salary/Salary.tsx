"use client";
import React from "react";
import { SelectableCountries, SalaryTrendChart, SalaryBarChart } from "../index";
import { useQuery } from "@tanstack/react-query";
import { getJobDetails } from "@/app/functions/queryFunctions/getJobDetails";
import { config } from "@/app/config/envConfiguration";
import { jobSalaryType } from "@/app/types/jobSalary";
import { APIResponse } from "@/app/types/APIResponse";
import SkeletonCard from "@/app/_components/structures/skleton/SkletonCard";
type SalaryProps = {
  jobTitle: string;
  country: string;
};
const Salary: React.FC<SalaryProps> = ({ jobTitle, country }) => {
  const { data: salaryData, isPending } = useQuery<APIResponse<jobSalaryType>>({
    queryKey: ["jobSalaryDetails", jobTitle, country],
    queryFn: () =>
      getJobDetails<jobSalaryType>(
        `/api/salary?jobtitle=${jobTitle}&country=${country}`
      ),
  });
  return (
    <div className="flex flex-col gap-4">
      <section className="twoColumnSection">
        {salaryData?.data ? (
          <>
            <SalaryTrendChart chartData={salaryData.data} />
            <SalaryBarChart salaryData={salaryData.data} />
          </>
        ) : (
          [...Array(2)].map((_, i) => <SkeletonCard key={i} />)
        )}
      </section>
      <SelectableCountries />
    </div>
  );
};
export default Salary;
