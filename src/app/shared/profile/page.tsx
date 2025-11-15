"use client"
import ProfileSkleton from '@/app/(dashboard)/profile/ProfileSkleton'
import ProgressCard from '@/app/(dashboard)/profile/Progress'
import { CommonFooter, LandingPageHeader, PagesHeader } from '@/app/_components'
import { SingleJobTitle } from '@/app/types/userAuth'
import { UserState } from '@/app/types/userState'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUserDetails } from '../userDetails'
import SharedUserCard from '../SharedUserCard'
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const userToken = searchParams.get('usertoken');
  const { userDetails, isPending } = useUserDetails(userToken ?? "")
  return (
    <div>
      {isPending && <ProfileSkleton />}
      {!isPending && <div className="dbItems container">
        {userDetails && userDetails.jobTitles && userDetails.jobTitles.length > 0 ? (
          <>
            <SharedUserCard fullName={userDetails.fullName} userToken={userToken ?? ""} link={false} text='Skills of' />
            {userDetails.jobTitles.map((singleJobTitle: SingleJobTitle, index: number) => (
              <ProgressCard jobTitle={singleJobTitle.title} score={singleJobTitle.score} editValue={false} key={index} editable={false} userToken={userToken!} shared={true} />
            ))}
          </>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BriefcaseBusiness />
              </EmptyMedia>
              <EmptyTitle>No Job Saved</EmptyTitle>
              <EmptyDescription className="primaryParagraph">
                There are no jobs saved in the database for <span className="font-bold">{userDetails?.fullName}</span>.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => router.push('/')}>Create Your Profile</Button>
            </EmptyContent>
          </Empty>
        )}
      </div>}
    </div>
  )
}
export default page