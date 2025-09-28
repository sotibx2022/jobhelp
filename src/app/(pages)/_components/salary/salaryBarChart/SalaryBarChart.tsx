"use client"
import type { jobSalaryType } from "@/app/types/jobSalary"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig } from "@/components/ui/chart"
import { 
  Select, 
  SelectItem, 
  SelectContent, 
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { useState } from "react"
import BarChartContent from "./BarChartContent"
import { IChartData } from "./barChartTypes"
interface ISalaryData {
  salaryData: jobSalaryType
}
const SalaryBarChart: React.FC<ISalaryData> = ({ salaryData }) => {
  const [salaryDuration, setSalaryDuration] = useState<"Hour" | "Month" | "Annual">("Hour")
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
  intern: "#ADD8E6",
  junior: "#87CEEB",
  senior: "#1E3A8A",
  expert: "#00008B",
}
  const experienceLabels: Record<string, string> = {
    intern: "Intern",
    junior: "Junior",
    senior: "Senior",
    expert: "Expert",
  }
  const chartData: IChartData[] = [
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
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig
  return (
    <Card className="flex-1 md:max-w-[400px] w-full">
      <CardHeader className="pb-2 flex flex-col items-center">
        <div>
          <CardTitle className="secondaryHeading">Salary by Experience</CardTitle>
        </div>
        <Select 
          value={salaryDuration} 
          onValueChange={(value: "Hour" | "Month" | "Annual") => setSalaryDuration(value)}
        >
          <SelectTrigger className="w-[120px] sm:w-[140px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hour">Hourly</SelectItem>
            <SelectItem value="Month">Monthly</SelectItem>
            <SelectItem value="Annual">Annually</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <BarChartContent 
          chartConfig={chartConfig} 
          chartData={chartData} 
          salaryDuration={salaryDuration}
          salaryByExperience={salaryByExperience}
          currency={currency}
          averageSalary ={mid}
        />
      </CardContent>
    </Card>
  )
}
export default SalaryBarChart