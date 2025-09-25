"use client"
import type { jobSalaryType } from "@/app/types/jobSalary"
import type React from "react"
import { Banknote, Clock, CurrencyIcon, DollarSignIcon, TimerIcon, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
interface ISalaryData {
  salaryData: jobSalaryType
}
export const description = "A bar chart showing salary by experience level"
const SalaryBarChart: React.FC<ISalaryData> = ({ salaryData }) => {
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
  // Fixed: Properly format currency function
  const formatCurrency = (value: number) => {
    return `${value.toLocaleString()}`
  }
  const chartData = [
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
    <Card className="max-w-sm">
      <CardHeader>
        <p className="secondaryHeading"> {`${currency} ${mid}`}</p>
        <p className="primaryParagraph">{`Avg. Base Hourly Rate ${currency}`}</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-[110%] -ml-8">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 0, left: 0, top: 10, bottom: 10 }}
            barSize={20}
            barCategoryGap={2}
          >
            <CartesianGrid horizontal={false} />
            {/* Fixed: YAxis uses experience labels instead of years */}
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
            />
            {/* Fixed: XAxis uses correct formatter function */}
            <XAxis
              type="number"
              tickFormatter={formatCurrency}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={formatCurrency}
            />
            <Bar dataKey="salary" radius={4}>
              {/* Fixed: LabelList uses correct formatter */}
              <LabelList
                dataKey="salary"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={formatCurrency}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col">
        <span className='primaryParagraph'>Salary by experience</span>
        <div className="badgeGroup flex gap-4">
          <Badge className="flex items-center gap-2"><Banknote className="w-4 h-4" /> Euro</Badge>
          <Badge className="flex items-center gap-2"><Clock className="w-4 h-4" /> Hourly</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
export default SalaryBarChart