import { NextResponse, type NextRequest } from 'next/server';
import { jobContentsPrompt } from '../../langchain/prompts/jobContents';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ContentsSchema, ContentsType } from '@/app/types/roadmapTypes';
import { APIResponseError, APIResponseSuccess } from '@/app/types/APIResponse';
import { llmModel } from '@/app/config/llmConfig';
import { cleanJsonString, extractText, findJson, findJsonArray } from '../../langchain/langchainFunctions';
export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const searchParams = url.searchParams;
    const jobTitle = searchParams.get('jobtitle');
    if (!jobTitle) {
        return NextResponse.json({ message: 'Job Title is not provided', success: false, status: 400, data: undefined } as APIResponseError)
    }
    const structuredParser = StructuredOutputParser.fromZodSchema(ContentsSchema)
    const formatInstructions = structuredParser.getFormatInstructions()
    const prompt = jobContentsPrompt(jobTitle, formatInstructions)
    const rawResponse = await llmModel.invoke(prompt);
    const extractedText = extractText(rawResponse);
    const jsonText = findJsonArray(extractedText)
    const cleanedJson = jsonText?.trim();
    if(!cleanedJson){
        return NextResponse.json({message:"there is no array found",status:400,success:false,data:undefined} as APIResponseError)
    }
    const finalCleanedJson = cleanJsonString(cleanedJson)
    const structuredResult = await structuredParser.parse(finalCleanedJson);
    return NextResponse.json({ message: "success", status: 200, success: true, data: structuredResult } as APIResponseSuccess<ContentsType>)
}