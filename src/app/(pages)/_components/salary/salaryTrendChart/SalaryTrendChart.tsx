"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { jobSalaryType } from "@/app/types/jobSalary"
const chartConfig = {
  salary: {
    label: "Salary",
    color: "var(--chart-1)",
  },
  intern: {
    label: "Intern",
    color: "var(--chart-1)",
  },
  junior: {
    label: "Junior",
    color: "var(--chart-2)",
  },
  mid: {
    label: "Mid-Level",
    color: "var(--chart-3)",
  },
  senior: {
    label: "Senior",
    color: "var(--chart-4)",
  },
  expert: {
    label: "Expert",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig
interface ISalaryTrendChartProps {
  chartData: jobSalaryType
}
const SalaryTrendChart: React.FC<ISalaryTrendChartProps> = ({ chartData }) => {
  const transformedData = [
    {
      experience: "intern",
      salary: Number.parseInt(chartData.salaryByExperience.intern.replace(/,/g, "")),
      fill: "var(--color-intern)",
    },
    {
      experience: "junior",
      salary: Number.parseInt(chartData.salaryByExperience.junior.replace(/,/g, "")),
      fill: "var(--color-junior)",
    },
    {
      experience: "mid",
      salary: Number.parseInt(chartData.salaryByExperience.mid.replace(/,/g, "")),
      fill: "var(--color-mid)",
    },
    {
      experience: "senior",
      salary: Number.parseInt(chartData.salaryByExperience.senior.replace(/,/g, "")),
      fill: "var(--color-senior)",
    },
    {
      experience: "expert",
      salary: Number.parseInt(chartData.salaryByExperience.expert.replace(/,/g, "")),
      fill: "var(--color-expert)",
    },
  ]
  const firstSalary = transformedData[0].salary
  const lastSalary = transformedData[transformedData.length - 1].salary
  const years = 10;
const growthPercentage = (
  (Math.pow(lastSalary / firstSalary, 1 / years) - 1) * 100
).toFixed(1);
  const formatSalary = (value: number) => {
    return `${chartData.salaryByExperience.currency} ${value.toLocaleString()}`
  }
  return (
    <Card className="flex-1 flex flex-col w-full max-w-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="secondaryHeading">
          Salary Trend 
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={transformedData}
              margin={{ top: 24, right: 16, left: 16, bottom: 8 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="salary"
                    hideLabel
                    formatter={(value) => [formatSalary(value as number), "Salary"]}
                    className="bg-background border shadow-sm"
                  />
                }
              />
              <Line
                dataKey="salary"
                type="natural"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{
                  fill: "var(--chart-1)",
                  strokeWidth: 2,
                  stroke: "var(--background)",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  fill: "var(--chart-1)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-muted-foreground text-xs font-medium"
                  dataKey="experience"
                  formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm pt-0">
        <div className="flex gap-2 leading-none font-medium items-center">
          <TrendingUp className="primaryParagraph" />
          Annual growth of <span className='text-secondary font-bold'>{growthPercentage}%</span> from intern to expert
        </div>
      </CardFooter>
    </Card>
  )
}
export default SalaryTrendChart
