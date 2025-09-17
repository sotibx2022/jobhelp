import { NextResponse, type NextRequest } from "next/server";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { llmModel } from "@/app/config/llmConfig";
import { JobBaseDetailSchema } from "@/app/types/jobDetails";
import { extractText, findJson } from "../langchainFunctions";
export async function GET(req: NextRequest) {
    try {
        // /api/jobdetails?jobtitle=maintenanceplanner
        const url = new URL(req.url);
        const jobTitleInput = url.searchParams.get("jobtitle");
        if (!jobTitleInput) {
            return NextResponse.json(
                { error: "Missing 'jobtitle' query parameter." },
                { status: 400 }
            );
        }
        /** Prompt for the LLM */
        const prompt = `
You are an assistant that returns structured JSON about job profiles.
### Input
A user provides a job title (may include typos or symbols): **"${jobTitleInput}"**
### Instructions
1. Identify the closest valid job title if the input contains spelling mistakes or symbols.
2. Return a JSON object strictly matching this shape:
\`\`\`json
{
  "jobTitle": "string (4–50 chars, no special characters)",
  "jobDescription": "string (100–200 chars, no special characters)",
  "keyResponsibilities": [
    "string (20–50 chars, no special characters)",
    "...at least one item"
  ]
}
\`\`\`
3. Follow these constraints:
   - **jobTitle**: 4–50 characters, letters/numbers/spaces only.
   - **jobDescription**: 100–200 characters, no special characters except spaces, periods, or commas.
   - **keyResponsibilities**: Array of strings, each 20–50 characters, letters/numbers/spaces only.
Return only valid JSON.
`;
        // Ask the model
        const rawResponse = await llmModel.invoke(prompt);
        // Extract text from the raw response
        const text = extractText(rawResponse);
        // Parse JSON from LLM output
        // Validate and ensure it matches your schema
        // Return the validated object as JSON
        return NextResponse.json(text);
    } catch (err: any) {
        console.error("Error generating job profile:", err);
        return NextResponse.json(
            { error: "Failed to generate job profile." },
            { status: 500 }
        );
    }
}
