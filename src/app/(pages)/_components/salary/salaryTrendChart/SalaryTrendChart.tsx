import { jobSalaryType } from '@/app/types/jobSalary'
import React from 'react'
interface ISalaryData{
  chartData:jobSalaryType
}
const SalaryTrendChart:React.FC<ISalaryData> = ({chartData}) => {
  return (
    <div>SalaryTrendChart</div>
  )
}
export default SalaryTrendChart