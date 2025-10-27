import { connectToDb } from '@/app/config/connectToDb';
import { RoadMapModel } from '@/app/model/roadmap.model';
import { APIResponseSuccess } from '@/app/types/APIResponse';
import { NextResponse, type NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const { jobTitle, userId } = await req.json();
    // Ensure DB connection
    await connectToDb();
    // Attempt to delete the roadmap item
    const result = await RoadMapModel.deleteOne({ jobTitle, userId });
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
    console.error('Error deleting roadmap item:', error);
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
