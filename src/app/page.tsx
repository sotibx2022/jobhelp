import React from 'react'
import { SearchBar, LandingPageHeader, CommonFooter } from './_components'
const Page = () => {
  return (
    <section className="container h-screen flexBetween flex-col">
      <LandingPageHeader />
      <div className="flexCenter gap-2  flex-col ">
        <h1 className="primaryHeading">Job Help Board</h1>
        <h2 className="secondaryHeading">Get support for your job search</h2>
        <SearchBar />
      </div>
      <CommonFooter />
    </section>
  )
}
export default Page