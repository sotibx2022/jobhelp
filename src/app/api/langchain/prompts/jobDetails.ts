export function jobBasicDetailsPrompt(
  jobTitleInput: string,
  formatInstructions: string
): string {
  return `
You are an assistant that returns structured JSON about job profiles.
Input Job Title: "${jobTitleInput}"
${formatInstructions}
Return a JSON object with the following rules:
- Output must be a valid JSON object only.
- Do not include any explanations, notes, or markdown fences.
- Do not wrap the JSON in triple backticks.
- Do not add any text before or after the JSON.
- Strictly follow the given JSON schema.
For the field "keyResponsibilities":
- Generate a list of key responsibilities for this job.
- Each responsibility should be short and concise (one sentence).
- Include many items (aim for 10–15 responsibilities).
- Output the responsibilities as a JSON array of strings.
`;
}
