import React from 'react'
import { Roadmap } from '../_components'
interface ISearchParams {
  searchParams: Promise<{
    jobtitle: string
  }>
}
const page: React.FC<ISearchParams> = async ({ searchParams: mySearchParams }: ISearchParams) => {
  const searchParams = await mySearchParams;
  const jobTitle = searchParams.jobtitle;
  return (
    <Roadmap jobTitle={jobTitle} />
  )
}
export default page