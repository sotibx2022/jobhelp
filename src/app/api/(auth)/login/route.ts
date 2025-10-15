import { UserModel } from '@/app/model/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
import jwt from 'jsonwebtoken';
import { config } from '@/app/config/envConfiguration';
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        // Check if user exists
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return NextResponse.json<APIResponseError>({
                message: "User not found",
                success: false,
                status: 404,
                data: undefined
            });
        }
        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return NextResponse.json<APIResponseError>({
                message: "Invalid credentials",
                success: false,
                status: 401,
                data: undefined
            });
        }
        // Generate JWT token
        const userToken = jwt.sign(
            { userId: existingUser._id },
            config.passwordSecret!,
            { expiresIn: '1h' }
        );
        // Prepare response
        const response = NextResponse.json<APIResponseSuccess<undefined>>({
            message: "Login successful",
            success: true,
            status: 200,
            data: undefined
        });
        // Set token cookie
        response.cookies.set('userToken', userToken, {
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour expiry
            secure: process.env.NODE_ENV === 'production',
        });
        return response;
    } catch (error: any) {
        return NextResponse.json<APIResponseError>({
            message: error.message || "Something went wrong",
            success: false,
            status: 500,
            data: undefined
        });
    }
}
