import { connectToDb } from '@/app/config/connectToDb';
import { validateUserToken } from '@/app/functions/middlewareFunctions/validateUserToken';
import { UserModel } from '@/app/model/user.model';
import { UserSliceState } from '@/app/redux/userDetailsSlice';
import { APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
import { NextResponse, type NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        await connectToDb();
        const { jobTitle, score } = await req.json();
        if (!jobTitle || score === undefined) {
            return NextResponse.json({
                message: "Job title or score not provided",
                status: 400,
                success: false,
            } as APIResponseError);
        }
        const userId = await validateUserToken(req);
        if (!userId) {
            return NextResponse.json({
                message: "Unauthorized to update user",
                success: false,
                status: 401,
            } as APIResponseError);
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false,
                status: 404,
            } as APIResponseError);
        }
        if (!Array.isArray(user.jobtitles)) {
            user.jobtitles = [];
        }
        user.jobTitles.push({ title: jobTitle, score });
        await user.save();
        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            status: 200,
            data: user,
        } as APIResponseSuccess<UserSliceState>);
    } catch (error: any) {
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            status: 500,
        } as APIResponseError);
    }
}
