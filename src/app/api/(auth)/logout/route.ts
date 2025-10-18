import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  const response = NextResponse.json({
    message: 'Logged out successfully',
    success: true,
  });
  response.cookies.set('userToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });
  return response;
}
