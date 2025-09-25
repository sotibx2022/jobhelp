import React from 'react'
import { SelectableCountries, SalaryTrendChart, SalaryBarChart } from '../index'
const Salary = () => {
    return (
        <div>
            <SelectableCountries />
            <SalaryTrendChart />
            <SalaryBarChart />
        </div>
    )
}
export default Salary