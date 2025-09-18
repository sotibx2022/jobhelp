import React from 'react'
const Page = () => {
  return (
      <section className="container">
        <div className="flexCenter gap-2  flex-col h-screen">
          <h1 className="primaryHeading">Job Help Board</h1>
          <h2 className="secondaryHeading">Get support for your job search</h2>
          <div className="w-full">
            <div className="formItem flexCenter flex-col">
              <input
                type="text"
                className="formInput max-w-[500px]"
                placeholder="eg. Maintenance Planner"
              />
            </div>
          </div>
        </div>
      </section>
  )
}
export default Page