import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Banknote, Clock, CurrencyIcon, DollarSignIcon, TimerIcon, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import React from 'react'
import { BarChartContentProps } from "./barChartTypes"
const BarChartContent: React.FC<BarChartContentProps> = ({ chartConfig, chartData, salaryDuration, salaryByExperience }) => {
    const { intern, mid, junior, senior, expert, currency } = salaryByExperience
    const formatCurrency = (value: number) => {
        return `${value.toLocaleString()}`
    }
    let modifiedChartData = []
    switch (salaryDuration) {
        case 'Hourly':
            modifiedChartData = chartData.map((data: any, index: number) => {
                return data.salary / (12 * 30 * 22 * 8)
            })
            break;
        case 'Monthly':
            modifiedChartData = chartData.map((data: any, index: number) => {
                return data.salary / 12
            })
            break;
        default:
            modifiedChartData = chartData
    }
    return (
        <>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-[110%] -ml-8">
                    <BarChart
                        accessibilityLayer
                        data={modifiedChartData}
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
                    <Badge className="flex items-center gap-2"><Banknote className="w-4 h-4" /> {currency}</Badge>
                    <Badge className="flex items-center gap-2"><Clock className="w-4 h-4" /> {salaryDuration}</Badge>
                </div>
            </CardFooter>
        </>
    )
}
export default BarChartContent