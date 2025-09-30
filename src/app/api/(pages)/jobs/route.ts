import { config } from '@/app/config/envConfiguration';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios from 'axios';
// Helper function to fetch jobs from Google API
async function fetchJobs(jobtitle: string, country: string, page: number) {
  const start = (page - 1) * 10 + 1;
  const encodedJobTitle = encodeURIComponent(jobtitle);
  const searchUrl = `${config.google.apiurl}?q=${encodedJobTitle}&cr=${country}&dateRestrict=d7&filter=1&lr=lang_en&orTerms=vacancy+jobs&siteSearch=linkedin.com&start=${start}&num=10&key=${config.google.apiKey}&cx=${config.google.cxid}`;
  try {
    const { data } = await axios.get(searchUrl);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch jobs');
  }
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const jobtitle = searchParams.get('jobtitle') || '';
  const country = searchParams.get('country') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  try {
    const jobsData = await fetchJobs(jobtitle, country, page);
    return NextResponse.json(jobsData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to fetch search results',
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}
