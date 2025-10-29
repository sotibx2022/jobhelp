'use client';
import React, { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Accordion } from '@radix-ui/react-accordion';
import ProgressCard from '@/app/(dashboard)/profile/Progress';
import SingleRoadMap from '@/app/(pages)/_components/roadmap/SingleRoadMap';
import { useOverallScore } from '@/app/(pages)/_components/roadmap/useOverallLength';
import { CommonFooter, PagesHeader } from '@/app/_components';
import SkletonRoadmapPage from '@/app/_components/structures/skleton/SkletonRoadmapPage';
import { useUserDetails } from '../userDetails';
import { RoadMapState } from '@/app/redux/roadmapSlice';
import { APIResponse } from '@/app/types/APIResponse';
import { ContentUIType } from '@/app/types/roadmapTypes';
const Page = () => {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobtitle') ?? '';
  const userToken = searchParams.get('usertoken') ?? '';
  // ✅ Fetch roadmap contents via React Query
  const {
    data: contents,
    isPending: contentsPending,
    isError: contentsError,
  } = useQuery({
    queryKey: ['sharedRoadMapDetails', jobTitle, userToken],
    queryFn: async () => {
      const response = await axios.get<APIResponse<RoadMapState>>(
        `/api/dbcontents?jobtitle=${jobTitle}&usertoken=${userToken}`
      );
      return response.data;
    },
    enabled: !!jobTitle && !!userToken, // avoids fetching when params are missing
  });
  // ✅ Fetch user details with your custom hook
  const { isLoading: userDetailsPending, userDetails } = useUserDetails(userToken);
  // ✅ Compute overall score safely
  const score = useMemo(() => {
    if (contentsPending || !contents?.data?.roadMapContents) return 0;
    const roadmapContents = contents.data.roadMapContents;
    return roadmapContents.length ? useOverallScore(roadmapContents) : 0;
  }, [contentsPending, contents?.data?.roadMapContents]);
  // ✅ Provide safe defaults
  const contentsData = contents?.data ?? { jobTitle: 'N/A', roadMapContents: [] };
  // ✅ Handle loading state cleanly
  if ((contentsPending || userDetailsPending) && contentsData.roadMapContents.length === 0) {
    return <SkletonRoadmapPage />;
  }
  // ✅ Handle API errors gracefully
  if (contentsError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 text-lg font-medium">Failed to load roadmap data.</p>
      </div>
    );
  }
  return (
    <>
      <PagesHeader />
      <div className="container w-full">
        <div className="userProfile py-4 text-xl font-semibold text-center">
          {userDetails?.fullName ?? 'Guest User'}
        </div>
        <ProgressCard
          jobTitle={contentsData.jobTitle}
          score={score}
          editValue
          editable
          readOnly
        />
        {contentsData.roadMapContents.length > 0 && (
          <Accordion
            type="multiple"
            defaultValue={contentsData.roadMapContents.map((_, index) => `item-${index}`)}
            className="w-full"
          >
            {contentsData.roadMapContents.map((content: ContentUIType, index: number) => (
              <SingleRoadMap key={index} index={index} content={content} edit={false} />
            ))}
          </Accordion>
        )}
      </div>
      <CommonFooter />
    </>
  );
};
export default Page;
