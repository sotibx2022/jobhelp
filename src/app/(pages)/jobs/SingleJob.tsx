import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Briefcase, CalendarDays } from "lucide-react";
import Link from 'next/link';
interface ISingleJobProps{
  index:number,
  link:string,
  title:string,
  snippet:string,
}
const SingleJob:React.FC<ISingleJobProps> = ({index,link,title,snippet}) => {
  return (
    <Card key={index} className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <Link href={link} target="_blank">
                <CardTitle className="secondaryHeading">{title}</CardTitle>
                <CardDescription className='primaryParagraph mt-2'>
                  <div className="flex gap-2 items-center">
                <CalendarDays className='h-4 w-4' />
                  {snippet.split('...')[0]}
              </div>
                </CardDescription>
              </Link>
            </div>
          </CardHeader>
        </Card>
  )
}
export default SingleJob