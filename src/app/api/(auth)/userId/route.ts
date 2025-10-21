import { connectToDb } from '@/app/config/connectToDb';
import { validateUserToken } from '@/app/functions/middlewareFunctions/validateUserToken';
import { UserModel } from '@/app/model/user.model';
import { NextResponse, type NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
    // Validate user token
    const userId = validateUserToken(req);
    // If token is invalid, return unauthorized response
    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized user", status: "error", success: false, data: null },
            { status: 401 }
        );
    }
    // Connect to database
    await connectToDb();
    try {
        // Find user by ID
        const existingUser = await UserModel.findById(userId).select("-password -__v");
        if (!existingUser) {
            return NextResponse.json(
                { message: "User not found", status: "error", success: false, data: null },
                { status: 404 }
            );
        }
        // Success response
        return NextResponse.json({
            message: "User fetched successfully",
            status: "success",
            success: true,
            data: existingUser,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: "error", success: false, data: null },
            { status: 500 }
        );
    }
}
