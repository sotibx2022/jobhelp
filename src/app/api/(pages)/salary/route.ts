import { NextResponse, type NextRequest } from 'next/server';
import { jobSalaryPrompt } from '../../langchain/prompts/jobSalary';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { jobSalarySchema } from '@/app/types/jobSalary';
import { llmModel } from '@/app/config/llmConfig';
import { extractText, findJson } from '../../langchain/langchainFunctions';
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const jobtitle = searchParams.get('jobtitle');
    const country = searchParams.get('country');
    console.log(jobtitle, country)
    if (!jobtitle || !country) {
        return NextResponse.json(
            { message: "Job Title and Country are required", success: false },
            { status: 400 }
        );
    }
    const structuredParser = StructuredOutputParser.fromZodSchema(jobSalarySchema);
    const formatInstructions = structuredParser.getFormatInstructions()
    const prompt = jobSalaryPrompt(jobtitle, country, formatInstructions);
    const rawResponse = await llmModel.invoke(prompt);
    const extractedText = extractText(rawResponse);
    const jsonText = findJson(extractedText)
    const cleanedJson = jsonText?.trim();
    const structuredResult = await structuredParser.parse(cleanedJson);
    return NextResponse.json({ message: "success", status: 200, success: true, data: structuredResult })
}