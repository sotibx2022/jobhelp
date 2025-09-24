export function jobBasicDetailsPrompt(
  jobTitleInput: string,
  formatInstructions: string
): string {
  return `
You are an assistant that returns structured JSON about job profiles.
Input Job Title: "${jobTitleInput}"
${formatInstructions}
Return a JSON object with the following fields:
- jobTitle (string)
- jobDescription (string)
- keyResponsibilities (array of strings)
Return valid JSON only, do not include explanations, code fences, or extra text.
`;
}
