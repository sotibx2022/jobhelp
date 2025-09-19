import React from 'react'
import { SearchBar,LandingPageHeader } from './_components'
const Page = () => {
  return (
    <section className="container">
      <LandingPageHeader/>
      <div className="flexCenter gap-2  flex-col h-screen">
        <h1 className="primaryHeading">Job Help Board</h1>
        <h2 className="secondaryHeading">Get support for your job search</h2>
        <SearchBar />
      </div>
    </section>
  )
}
export default Page