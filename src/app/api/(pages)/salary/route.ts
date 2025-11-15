import { NextResponse, type NextRequest } from "next/server";
import { jobSalaryPrompt } from "../../langchain/prompts/jobSalary";
import { jobSalarySchema } from "@/app/types/jobSalary";
import { llmModel } from "@/app/config/llmConfig";
import { extractText, findJson } from "../../langchain/langchainFunctions";
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const jobtitle = searchParams.get("jobtitle");
  const country = searchParams.get("country");
  if (!jobtitle || !country) {
    return NextResponse.json(
      { message: "Job Title and Country are required", success: false },
      { status: 400 }
    );
  }
  // Generate prompt for LLM
  const prompt = jobSalaryPrompt(jobtitle, country, ""); // No format instructions needed now
  const rawResponse = await llmModel.invoke(prompt);
  // Extract text and find JSON
  const extractedText = extractText(rawResponse);
  const jsonText = findJson(extractedText);
  if (!jsonText) {
    return NextResponse.json(
      { message: "Failed to extract JSON from LLM response", success: false },
      { status: 500 }
    );
  }
  let parsedData: any;
  try {
    parsedData = JSON.parse(jsonText);
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid JSON from LLM", success: false },
      { status: 500 }
    );
  }
  // Normalize salary values to numbers
  if (parsedData.salaryByExperience && typeof parsedData.salaryByExperience === "object") {
    parsedData.salaryByExperience = Object.fromEntries(
      Object.entries(parsedData.salaryByExperience).map(([key, value]) => {
        if (key === "currency") return [key, value as string];
        let numericValue: number;
        if (typeof value === "number") {
          numericValue = value;
        } else if (typeof value === "string") {
          numericValue = Number(value.replace(/[$,]/g, ""));
          if (isNaN(numericValue)) numericValue = 0;
        } else {
          numericValue = 0;
        }
        return [key, numericValue];
      })
    );
  }
  // Validate and parse using Zod
  let structuredResult;
  try {
    structuredResult = jobSalarySchema.parse(parsedData);
  } catch (err) {
    return NextResponse.json(
      { message: "Parsed data did not match schema", success: false, error: err },
      { status: 500 }
    );
  }
  return NextResponse.json({
    message: "success",
    status: 200,
    success: true,
    data: structuredResult,
  });
}
