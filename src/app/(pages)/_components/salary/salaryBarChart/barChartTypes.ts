import { ChartConfig } from "@/components/ui/chart"
// Salary by experience type
export interface ISalaryByExperience {
  intern: number,
  junior: number,
  mid: number,
  senior: number,
  expert: number,
  currency: string
}
// Each item in chartData
export interface IChartData {
  experience: "intern" | "junior" | "mid" | "senior" | "expert"
  label: string
  years: number
  salary: number
  fill: string
}
// Allowed salary durations
export type SalaryDuration = "Hour" | "Month" | "Annual"
// Props for BarChartContent
export interface BarChartContentProps {
  chartConfig: ChartConfig
  chartData: IChartData[]
  salaryDuration: SalaryDuration
  salaryByExperience: ISalaryByExperience,
  currency:string,
  averageSalary:string,
}