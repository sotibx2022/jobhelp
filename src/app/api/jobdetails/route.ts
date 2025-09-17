import type { NextRequest } from 'next/server';
import { response } from '../apiFuncations/returnResponse';
export async function GET(req: NextRequest) {
    return response("Job Title Received",200, true)
}