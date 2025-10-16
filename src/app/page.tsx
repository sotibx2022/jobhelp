import React, { Suspense } from 'react'
import { SearchBar, LandingPageHeader, CommonFooter, Loading } from './_components'
import SearchBarSkeleton from './_components/structures/skleton/SkletonSearchBar'
import DisplayProvider from './context/DisplayComponent'
import ErrorToast from './_components/absoluteComponents/toastComponents/ErrorToast'
const Page = () => {
  return (
    <DisplayProvider>
      <section className="container h-screen flexBetween flex-col">
        <LandingPageHeader />
        <div className="flexCenter gap-2  flex-col ">
          <h1 className="primaryHeading">Job Help Board</h1>
          <h2 className="secondaryHeading">Get support for your job search</h2>
          <Suspense fallback={<SearchBarSkeleton />}>
            <SearchBar />
          </Suspense>
        </div>
        <CommonFooter />
      </section>
    </DisplayProvider>
  )
}
export default Page