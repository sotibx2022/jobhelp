import { config } from '@/app/config/envConfiguration';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios from 'axios';
export async function GET(req: NextRequest) {
  const url = req.url;
  const searchParams = new URLSearchParams(url.split('?')[1]); // extract query params
  const jobtitle = searchParams.get('jobtitle') || '';
  const country = searchParams.get('country') || '';
  const page = parseInt(searchParams.get('page') || '1', 10); // default to 1 if not provided
  const start = (page - 1) * 10 + 1; // calculate start index for pagination
  const searchUrl = `${config.google.apiurl}?q=${jobtitle}&cr=${country}&dateRestrict=d7&filter=1&lr=lang_en&orTerms=vacancy+jobs&siteSearch=linkedin.com&start=${start}&num=10&key=${config.google.apiKey}&cx=${config.google.cxid}`;
  try {
    const { data } = await axios.get(searchUrl);
    return NextResponse.json(data, { status: 200 });
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
