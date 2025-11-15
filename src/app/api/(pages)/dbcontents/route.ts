import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/app/config/connectToDb"; // or "@/app/functions/connectToDb" depending on your project
import { validateUserToken } from "@/app/functions/middlewareFunctions/validateUserToken";
import { ContentUIType, IRoadMapContentsDBType } from "@/app/types/roadmapTypes";
import { APIResponse } from "@/app/types/APIResponse";
import { RoadMapModel } from '@/app/model/roadmap.model';
import jwt from 'jsonwebtoken';
import { config } from "@/app/config/envConfiguration";
export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Connect to DB
    await connectToDb();
    // 2️⃣ Validate user token
    const userId = validateUserToken(req);
    if (!userId) {
      return NextResponse.json(
        {
          message: "No user ID found. Unauthorized access.",
          status: 401,
          success: false,
        } as APIResponse<null>,
        { status: 401 }
      );
    }
    // 3️⃣ Get jobTitle from query
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const jobTitle = searchParams.get("jobtitle");
    if (!jobTitle) {
      return NextResponse.json(
        {
          message: "No job title provided.",
          status: 400,
          success: false,
        } as APIResponse<null>,
        { status: 400 }
      );
    }
    // 4️⃣ Get roadmap data from request body
    const data: ContentUIType[] = await req.json();
    // 5️⃣ Check if roadmap already exists
    const existingRoadMap = await RoadMapModel.findOne({ userId, jobTitle });
    if (!existingRoadMap) {
      // 6️⃣ Create new roadmap
      const newRoadMapItem = new RoadMapModel({
        userId,
        jobTitle,
        roadMapContents: data,
      });
      await newRoadMapItem.save();
      return NextResponse.json({
        message: "New RoadMap item created.",
        status: 201,
        success: true,
        data: newRoadMapItem,
      } as APIResponse<IRoadMapContentsDBType>);
    } else {
      // 7️⃣ Update existing roadmap
      existingRoadMap.roadMapContents = data;
      await existingRoadMap.save();
      return NextResponse.json({
        message: "RoadMap updated successfully.",
        status: 200,
        success: true,
        data: existingRoadMap,
      } as APIResponse<IRoadMapContentsDBType>);
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error.",
        status: 500,
        success: false,
      } as APIResponse<null>,
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const jobTitle = searchParams.get("jobtitle");
    let userId = searchParams.get('usertoken');
    const userToken = userId
    if (!userToken) {
      userId = validateUserToken(req);
      if (!userId) {
        return NextResponse.json(
          {
            message: "No user ID found. Unauthorized access.",
            status: 401,
            success: false,
          } as APIResponse<null>,
          { status: 401 }
        );
      }
    } else {
    }
    if (!jobTitle) {
      return NextResponse.json(
        {
          message: "No job title provided.",
          status: 400,
          success: false,
        } as APIResponse<null>,
        { status: 400 }
      );
    }
    const roadMapContents = await RoadMapModel.findOne({ userId, jobTitle });
    if (!roadMapContents) {
      return NextResponse.json(
        {
          message: "No roadmap contents found for this user and job title.",
          status: 404,
          success: false,
        } as APIResponse<null>,
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Roadmap items fetched from database.",
        status: 200,
        success: true,
        data: roadMapContents as IRoadMapContentsDBType,
      } as APIResponse<IRoadMapContentsDBType>,
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching roadmap items:", error);
    return NextResponse.json(
      {
        message: "Internal server error.",
        status: 500,
        success: false,
      } as APIResponse<null>,
      { status: 500 }
    );
  }
}
