import { NextResponse, type NextRequest } from "next/server";
import {StructuredOutputParser } from "@langchain/core/output_parsers";
import { llmModel } from "@/app/config/llmConfig";
import { JobBaseDetailSchema } from "@/app/types/jobDetails";
import { jobDetailsPrompts } from "../langchain/prompts/jobDetails";
import { extractText, findJson } from "../langchain/langchainFunctions";
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const jobTitleInput = url.searchParams.get("jobtitle");
        if (!jobTitleInput) {
            return NextResponse.json(
                { error: "Missing 'jobtitle' query parameter." },
                { status: 400 }
            );
        }
        const structuredParser = StructuredOutputParser.fromZodSchema(JobBaseDetailSchema);
        const formatInstructions = structuredParser.getFormatInstructions();
        const prompt = `
You are an assistant that returns structured JSON about job profiles.
Input Job Title: "${jobTitleInput}"
${formatInstructions}
Return a JSON object with the following fields:
- jobTitle (string)
- jobDescription (string)
- keyResponsibilities (array of strings)
Return valid JSON only, do not include explanations, code fences, or extra text.
`;
        const rawResponse = await llmModel.invoke(prompt);
        const extractedText = extractText(rawResponse);
        const jsonText = findJson(extractedText)
        try {
            const structuredResult = await structuredParser.parse(jsonText);
            return NextResponse.json(structuredResult);
        } catch (parseError) {
            console.error("Parsing error:", parseError);
            return NextResponse.json(
                { error: "Failed to parse job profile according to schema." },
                { status: 500 }
            );
        }
    } catch (err: any) {
        console.error("Error generating job profile:", err);
        return NextResponse.json(
            { error: "Failed to generate job profile." },
            { status: 500 }
        );
    }
}
