"use client"
import React, { useEffect } from 'react'
import { FileText, Search, Map, TrendingUp, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from '@/app/functions/queryFunctions/getUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '@/app/redux/userDetailsSlice'
const CommonFooter = () => {
  const dispatch = useDispatch()
  const { data: userData, isPending } = useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails
  })
  useEffect(() => {
    if (userData?.success) {
      dispatch(setUserDetails(userData.data))
    }
  }, [userData])
  const features = [
    {
      title: "Resume",
      icon: FileText,
    },
    {
      title: "Job",
      icon: Search,
    },
    {
      title: "Roadmap",
      icon: Map,
    },
    {
      title: "Salary",
      icon: TrendingUp,
    },
  ]
  return (
    <footer className="w-full border-t mt-4">
      <div className="container mx-auto p-4">
        {/* Features Section */}
        <div className="flexBetween mb-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className='w-[100px] flex flex-col items-center gap-2'
            >
              <div className="flex justify-center">
                <feature.icon
                  className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="primaryParagraph">
                {feature.title}
              </div>
            </div>
          ))}
        </div>
        <p className="primaryParagraph text-sm text-center">
          © {new Date().getFullYear()} JobRise. All rights reserved. By Binaya Raj Soti.
        </p>
      </div>
    </footer>
  )
}
export default CommonFooter