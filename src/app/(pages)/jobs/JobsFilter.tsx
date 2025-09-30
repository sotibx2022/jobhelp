"use client"
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Calendar, Linkedin } from "lucide-react"
interface JobsFilterProps {
  jobtitle: string
  country: string
}
const JobsFilter: React.FC<JobsFilterProps> = ({ jobtitle, country }) => {
  return (
    <div className="flexBetween flex-wrap gap-2 my-2">
      {/* Job Title Badge */}
      <Badge variant="outline" className="flex items-center space-x-1">
        <User className="w-4 h-4" />
        <span className='primaryParagraph'>{jobtitle}</span>
      </Badge>
      {/* Country Badge */}
      <Badge variant="outline" className="flex items-center space-x-1">
        <MapPin className="w-4 h-4" />
        <span className='primaryParagraph'>{country}</span>
      </Badge>
      {/* Last 7 Calendar Days Badge */}
      <Badge variant="outline" className="flex items-center space-x-1">
        <Calendar className="w-4 h-4" />
        <span className='primaryParagraph'>Last 7 Days</span>
      </Badge>
      {/* LinkedIn Jobs Badge */}
      <Badge variant="outline" className="flex items-center space-x-1">
        <Linkedin className="w-4 h-4" />
        <span className='primaryParagraph'>LinkedIn Jobs</span>
      </Badge>
    </div>
  )
}
export default JobsFilter
