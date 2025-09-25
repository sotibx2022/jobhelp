"use client"
import type { jobSalaryType } from "@/app/types/jobSalary"
import type React from "react"
import { Card, CardHeader} from "@/components/ui/card"
import { type ChartConfig,} from "@/components/ui/chart"
import { Select, SelectItem,SelectContent, SelectTrigger } from "@/components/ui/select"
import { useState } from "react"
import BarChartContent from "./BarChartContent"
import { IChartData } from "./barChartTypes"
interface ISalaryData {
  salaryData: jobSalaryType
}
const SalaryBarChart: React.FC<ISalaryData> = ({ salaryData }) => {
  const [salaryDuration, setSalaryDuration] = useState<"Hourly" | "Monthly" | "Annually">("Hourly")
  const { salaryByExperience } = salaryData
  const { intern, mid, junior, senior, expert, currency } = salaryByExperience
  // Map roles to minimum years of experience
  const experienceYears: Record<string, number> = {
    intern: 0,
    junior: 2,
    mid: 4,
    senior: 6,
    expert: 8,
  }
  const experienceColors: Record<string, string> = {
    intern: "#E3F2FD",
    junior: "#90CAF9",
    mid: "#42A5F5",
    senior: "#1976D2",
    expert: "#0D47A1",
  }
  const experienceLabels: Record<string, string> = {
    intern: "Intern",
    junior: "Junior",
    mid: "Mid",
    senior: "Senior",
    expert: "Expert",
  }
  const chartData:IChartData[] = [
    {
      experience: "intern",
      label: experienceLabels["intern"],
      years: experienceYears["intern"],
      salary: Number.parseInt(intern.replace(/,/g, ""), 10),
      fill: experienceColors["intern"],
    },
    {
      experience: "junior",
      label: experienceLabels["junior"],
      years: experienceYears["junior"],
      salary: Number.parseInt(junior.replace(/,/g, ""), 10),
      fill: experienceColors["junior"],
    },
    {
      experience: "mid",
      label: experienceLabels["mid"],
      years: experienceYears["mid"],
      salary: Number.parseInt(mid.replace(/,/g, ""), 10),
      fill: experienceColors["mid"],
    },
    {
      experience: "senior",
      label: experienceLabels["senior"],
      years: experienceYears["senior"],
      salary: Number.parseInt(senior.replace(/,/g, ""), 10),
      fill: experienceColors["senior"],
    },
    {
      experience: "expert",
      label: experienceLabels["expert"],
      years: experienceYears["expert"],
      salary: Number.parseInt(expert.replace(/,/g, ""), 10),
      fill: experienceColors["expert"],
    },
  ]
  const chartConfig = {
    salary: {
      label: "Salary",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig
  return (
     <>
      <Select defaultValue="Hourly" onValueChange={(value) => setSalaryDuration(value as 'Hourly' || 'Monthly' || 'Annually')}>
      <SelectTrigger className="w-[180px]">
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Hourly">Hourly</SelectItem>
        <SelectItem value="Monthly">Monthly</SelectItem>
        <SelectItem value="Annually">Annually</SelectItem>
      </SelectContent>
    </Select>
      <BarChartContent chartConfig={chartConfig} chartData={chartData} salaryDuration={salaryDuration}
      salaryByExperience={salaryByExperience}/>
      </>
  )
}
export default SalaryBarChart