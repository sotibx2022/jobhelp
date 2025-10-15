import { UserModel } from '@/app/model/user.model';
import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
export async function POST(req: NextRequest) {
    try {
        const { email, newPassword, confirmNewPassword } = await req.json();
        // Check if passwords match
        if (newPassword !== confirmNewPassword) {
            return NextResponse.json({
                message: "New password and confirm password do not match",
                success: false,
                status: 400,
                data: undefined
            });
        }
        // Find existing user
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({
                message: "User not found",
                success: false,
                status: 404,
                data: undefined
            });
        }
        // Check if the new password is the same as the old one
        const isSamePassword = await bcrypt.compare(newPassword, existingUser.password);
        if (isSamePassword) {
            return NextResponse.json({
                message: "You cannot reuse the same password",
                success: false,
                status: 400,
                data: undefined
            });
        }
        // Hash the new password and save
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashedNewPassword;
        await existingUser.save();
        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
            status: 200,
            data: undefined
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message || "Something went wrong",
            success: false,
            status: 500,
            data: undefined
        });
    }
}
