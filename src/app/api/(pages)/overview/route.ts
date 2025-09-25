import { NextResponse, type NextRequest } from "next/server";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { JobBaseDetailSchema } from "@/app/types/jobDetails";
import { extractText, findJson } from "../../langchain/langchainFunctions";
import { llmModel } from "@/app/config/llmConfig";
import { jobBasicDetailsPrompt } from "../../langchain/prompts/jobDetails";
import { APIResponseSuccess, APIResponseError } from "@/app/types/APIResponse";
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const jobTitleInput = url.searchParams.get("jobtitle");
        if (!jobTitleInput) {
            const errorResponse: APIResponseError = {
                success: false,
                status: 400,
                message: "Missing 'jobtitle' query parameter.",
                data: undefined
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }
        const structuredParser = StructuredOutputParser.fromZodSchema(JobBaseDetailSchema);
        const formatInstructions = structuredParser.getFormatInstructions();
        const prompt = jobBasicDetailsPrompt(jobTitleInput, formatInstructions);
        const rawResponse = await llmModel.invoke(prompt);
        const extractedText = extractText(rawResponse);
        const jsonText = findJson(extractedText);
        try {
            const structuredResult = await structuredParser.parse(jsonText);
            const successResponse: APIResponseSuccess<typeof structuredResult> = {
                success: true,
                status: 200,
                message: "Job profile fetched successfully",
                data: structuredResult,
            };
            return NextResponse.json(successResponse, { status: 200 });
        } catch (parseError) {
            console.error("Parsing error:", parseError);
            const errorResponse: APIResponseError = {
                success: false,
                status: 500,
                message: "Failed to parse job profile according to schema.",
                data: undefined
            };
            return NextResponse.json(errorResponse, { status: 500 });
        }
    } catch (err: any) {
        console.error("Error generating job profile:", err);
        const errorResponse: APIResponseError = {
            success: false,
            status: 500,
            message: "Failed to generate job profile.",
            data: undefined
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
