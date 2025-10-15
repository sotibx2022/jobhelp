import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '@/app/config/envConfiguration';
import { UserModel } from '@/app/model/user.model';
import { APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
import { connectToDb } from '@/app/config/connectToDb';
export async function POST(req: NextRequest) {
    try {
        connectToDb();
        const { email, fullName, password, confirmPassword } = await req.json();
        // Check if passwords match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match", success: false, status: 400, data: undefined }
            );
        }
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists", success: false, status: 409, data: undefined }
            );
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = await UserModel.create({
            email,
            fullName,
            password: hashedPassword
        });
        // Generate JWT token
        const userToken = jwt.sign(
            { userId: newUser._id },
            config.passwordSecret!,
            { expiresIn: '1h' }
        );
        // Prepare response
        const response = NextResponse.json<APIResponseSuccess<undefined>>({
            message: "User created successfully",
            success: true,
            status: 201,
            data: undefined
        });
        // Set token cookie
        response.cookies.set('userToken', userToken, {
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong", success: false, status: 500 } as APIResponseError
        );
    }
}
