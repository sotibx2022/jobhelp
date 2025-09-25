import { jobSalaryType } from '@/app/types/jobSalary'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader,CardTitle } from '@/components/ui/card'
import { Banknote,Clock } from 'lucide-react'
import React from 'react'
interface ISalaryData{
  chartData:jobSalaryType
}
const SalaryTrendChart:React.FC<ISalaryData> = ({chartData}) => {
  return (
    <div>
      <Card>
       <CardHeader className="pb-2">
        <div>
          <CardTitle className="secondaryHeading">Salary Trend Experience</CardTitle>
          <p className="primaryParagraph">
            How your salary grow along with experience.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        this is a card content area and tomorrow i will work to render the care content using trendign chart.
      </CardContent>
      <CardFooter className="p-4 sm:p-6 border-t bg-muted/30">
                      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                          <span className="primaryParagraph">
                              Salary grow as per experience
                          </span>
                          <div className="flex flex-wrap gap-2 justify-center">
                              <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1 text-xs"
                              >
                                  <Banknote className="w-3 h-3" />
                                  currency
                              </Badge>
                              <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1 text-xs"
                              >
                                  <Clock className="w-3 h-3" />
                                  salary duration
                              </Badge>
                          </div>
                      </div>
                  </CardFooter>
      </Card>
    </div>
  )
}
export default SalaryTrendChart