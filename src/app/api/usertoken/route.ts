import { validateUserToken } from '@/app/functions/middlewareFunctions/validateUserToken';
import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { config } from '@/app/config/envConfiguration';
import { APIResponse, APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
import { UserModel } from '@/app/model/user.model';
import { UserState } from '@/app/types/userState';
import { connectToDb } from '@/app/config/connectToDb';
export async function GET(req: NextRequest) {
  try {
    // Validate user token and extract userId
    const userId = validateUserToken(req);
    if (!userId) {
      return NextResponse.json(
        {
          message: 'Invalid or missing authentication token',
          status: 401,
          success: false,
        } as APIResponseError,
      );
    }
    // Create a new JWT token for the user
    return NextResponse.json(
      {
        message: 'User token created successfully',
        status: 201,
        success: true,
        data: userId,
      } as APIResponseSuccess<string>,
    );
  } catch (error: any) {
    console.error('Error generating user token:', error);
    return NextResponse.json(
      {
        message: 'Failed to create user token',
        status: 500,
        success: false,
      } as APIResponseError,
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    // Connect to DB
    await connectToDb();
    // Parse request body
    const { userToken } = await req.json();
    if (!userToken) {
      return NextResponse.json(
        { message: "User token is required", success: false, status: 400 },
        { status: 400 }
      );
    }
    
    let userId = userToken
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload", success: false, status: 401 },
        { status: 401 }
      );
    }
    // Find user in DB
    const user = await UserModel.findById(userId).select("-email -password");
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false, status: 404 },
        { status: 404 }
      );
    }
    // Return success response
    return NextResponse.json({
      message: "User details found successfully",
      success: true,
      status: 200,
      data: user,
    } as APIResponseSuccess<UserState>);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch user", success: false, status: 500, error: error.message },
      { status: 500 }
    );
  }
}
