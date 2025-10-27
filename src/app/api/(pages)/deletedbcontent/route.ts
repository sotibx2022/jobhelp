import { connectToDb } from '@/app/config/connectToDb';
import { RoadMapModel } from '@/app/model/roadmap.model';
import { UserModel } from '@/app/model/user.model';
import { APIResponseSuccess } from '@/app/types/APIResponse';
import { SingleJobTitle } from '@/app/types/userAuth';
import { NextResponse, type NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { jobTitle, userId } = body;
        // Ensure DB connection
        await connectToDb();
        // Attempt to delete the roadmap item
        let parsedUserId = Object(userId);
        const result = await RoadMapModel.deleteOne({ jobTitle, userId: parsedUserId });
        // If no document was deleted, return an error response
        if (result.deletedCount === 0) {
            return NextResponse.json(
                {
                    message: 'No matching roadmap item found for deletion.',
                    success: false,
                    status: 404,
                },
                { status: 404 }
            );
        }
        // Remove jobTitle from user's jobTitles array
        const user = await UserModel.findOne({ _id: userId });
        if (user) {
            user.jobTitles = user.jobTitles?.filter((item: SingleJobTitle) => item.title !== jobTitle);
            await user.save();
        }
        // Success response
        return NextResponse.json(
            {
                message: 'Selected item deleted successfully.',
                success: true,
                status: 200,
                data: undefined,
            } as APIResponseSuccess<undefined>,
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: 'An error occurred while deleting the roadmap item.',
                success: false,
                status: 500,
            },
            { status: 500 }
        );
    }
}
