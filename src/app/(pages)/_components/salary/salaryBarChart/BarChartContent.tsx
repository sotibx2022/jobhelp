import { CardContent, CardFooter } from "@/components/ui/card"
import { Banknote, Clock } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { BarChartContentProps, IChartData } from "./barChartTypes"
const BarChartContent: React.FC<BarChartContentProps> = ({
    chartConfig,
    chartData,
    salaryDuration,
    currency,
    averageSalary
}) => {
    const formatCurrency = (value: number) => {
        return `${value.toLocaleString()}`
    }
    const modifiedChartData: IChartData[] = chartData.map((data: IChartData) => {
        let adjustedSalary = data.salary
        switch (salaryDuration) {
            case "Hour":
                adjustedSalary = Math.ceil(data.salary / (12 * 22 * 8))
                break
            case "Month":
                adjustedSalary = Math.ceil(data.salary / 12)
                break
            default:
                adjustedSalary = data.salary
        }
        return {
            ...data,
            salary: adjustedSalary,
        }
    })
    // Calculate average mid salary for display
   const returnAverageSalary = (salary: string): string => {
    const numericalSalary = Number.parseInt(salary.replace(/,/g, ""), 10);
    if (salaryDuration === 'Hour') {
        return Math.ceil(numericalSalary / (12 * 22 * 8)).toLocaleString();
    } else if (salaryDuration === 'Month') {
        return Math.ceil(numericalSalary / 12).toLocaleString();
    }
    return salary;
}
    return (
        <div className="flex flex-col h-full">
            {/* Chart Area */}
            <CardContent className="flex-1  sm:p-6">
                <div className="h-full flex flex-col">
                    <div className="mb-4 text-center">
                        <p className="primaryParagraph">
                            Average {salaryDuration} Salary
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold">
                            {currency} {returnAverageSalary(averageSalary)}
                        </p>
                    </div>
                    <ChartContainer
                        config={chartConfig}
                        className="w-full h-full min-h-[250px] flex-1"
                    >
                        <BarChart
                            accessibilityLayer
                            data={modifiedChartData}
                            layout="vertical"
                            margin={{
                                right: 20,
                                left: 0,
                                top: 10,
                                bottom: 10
                            }}
                            barSize={24}
                            barCategoryGap={6}
                        >
                            <CartesianGrid
                                horizontal={false}
                                stroke="hsl(var(--border))"
                            />
                            <YAxis
                                dataKey="label"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                width={80}
                                fontSize={12}
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                            />
                            <XAxis
                                type="number"
                                tickFormatter={formatCurrency}
                                fontSize={12}
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                axisLine={{ stroke: "hsl(var(--border))" }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                                formatter={formatCurrency}
                            />
                            <Bar
                                dataKey="salary"
                                radius={4}
                                fill="hsl(var(--primary))"
                            >
                                <LabelList
                                    dataKey="salary"
                                    position="right"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={11}
                                    formatter={formatCurrency}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
            {/* Footer with badges */}
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
                            <Banknote className="w-3 h-3" />
                            {currency}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1 text-xs"
                        >
                            <Clock className="w-3 h-3" />
                            {salaryDuration}
                        </Badge>
                    </div>
                </div>
            </CardFooter>
        </div>
    )
}
export default BarChartContent