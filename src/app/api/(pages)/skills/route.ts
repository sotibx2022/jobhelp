import { llmModel } from '@/app/config/llmConfig';
import { skillsSchema, skillsType } from '@/app/types/skillTypes';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { NextResponse, type NextRequest } from 'next/server';
import { cleanJsonString, extractText, findJson } from '../../langchain/langchainFunctions';
import { APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const jobtitle = searchParams.get('jobtitle');
    if (!jobtitle) {
        return NextResponse.json({ message: "job title is not provided", status: 400, success: false, data: undefined } as APIResponseError)
    }
    const structuredParser = StructuredOutputParser.fromZodSchema(skillsSchema);
    const formatInstructions = structuredParser.getFormatInstructions()
    const prompt = `
You are an API service that generates only JSON objects.
Job Title: "${jobtitle}"
Instructions:
- Output must be a valid JSON object only.
- Do not include any explanation, notes, or markdown fences.
- Do not wrap the JSON in triple backticks.
- Do not add text before or after the JSON.
- Strictly follow this JSON schema:
${formatInstructions}
`;
    const rawResponse = await llmModel.invoke(prompt);
    const extractedText = extractText(rawResponse);
    const jsonText = findJson(extractedText)
    const cleanedJson = jsonText?.trim();
    const finalCleanedJson = cleanJsonString(cleanedJson)
    const structuredResult = await structuredParser.parse(finalCleanedJson);
    return NextResponse.json({ message: "success", status: 200, success: true, data: structuredResult } as APIResponseSuccess<skillsType>)
}