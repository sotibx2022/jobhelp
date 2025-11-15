import React, { Suspense } from 'react'
import { SearchBar, LandingPageHeader, CommonFooter, Loading } from './_components'
import SearchBarSkeleton from './_components/structures/skleton/SkletonSearchBar'
import DisplayProvider from './context/DisplayComponent'
import { getQueryClient } from '@/hooks/getQueryClient'
import { dehydrate, hydrate, HydrationBoundary } from '@tanstack/react-query'
import { getUserDetails } from './functions/queryFunctions/getUserDetails'
import { SelectableCountries } from './(pages)/_components'
import axios from 'axios'
const Page = async () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <DisplayProvider>
      <section className="container h-screen flexBetween flex-col">
        <LandingPageHeader />
        <div className="flexCenter gap-2  flex-col ">
          <h1 className="primaryHeading">Level Up Your Future</h1>
          <Suspense fallback={<SearchBarSkeleton />}>
            <SearchBar />
          </Suspense>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <CommonFooter />
        </HydrationBoundary>
      </section>
    </DisplayProvider>
  )
}
export default Page