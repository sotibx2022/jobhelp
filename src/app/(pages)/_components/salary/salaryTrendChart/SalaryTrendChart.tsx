"use client"
import { CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { jobSalaryType } from "@/app/types/jobSalary"
import { Badge } from "@/components/ui/badge"
import { Banknote, Clock, Map } from "lucide-react"
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
          Salary Trend for {chartData.jobTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex-col items-center p-4 pt-0">
        <div className="mb-4 text-center">
          <p className="primaryParagraph">
            Annual Salary Groth
          </p>
          <p className="text-2xl sm:text-3xl font-bold">
            {growthPercentage}%
          </p>
        </div>
        <ChartContainer config={chartConfig} className="w-full h-full">
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
        </ChartContainer>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 border-t bg-muted/30">
        <div className="w-full flex flex-col  flexCenter gap-3">
          <span className="primaryParagraph">
            Salary breakdown by experience level
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              <Map className="w-3 h-3" />
              {chartData.country}
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              <Clock className="w-3 h-3" />
              Annual
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
export default SalaryTrendChart
