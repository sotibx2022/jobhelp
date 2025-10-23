import { validateUserToken } from '@/app/functions/middlewareFunctions/validateUserToken';
import { UserModel } from '@/app/model/user.model';
import { UserSliceState } from '@/app/redux/userDetailsSlice';
import { APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
import { NextResponse, type NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const { jobTitle, score } = await req.json();
        if (!jobTitle || score === undefined) {
            return NextResponse.json({
                message: "Job title or score not provided",
                status: 400,
                success: false,
            } as APIResponseError);
        }
        const userId = validateUserToken(req); 
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
        // ✅ Ensure jobtitles is initialized
        if (!Array.isArray(user.jobtitles)) {
            user.jobtitles = [];
        }
        user.jobtitles.push({ title: jobTitle, score });
        await user.save();
        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            status: 200,
            data: user,
        } as APIResponseSuccess<UserSliceState>);
    } catch (error: any) {
        console.error("Error updating user:", error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            status: 500,
        } as APIResponseError);
    }
}
