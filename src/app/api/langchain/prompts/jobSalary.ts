// jobSalaryPrompt.ts
export function jobSalaryPrompt(
  jobTitle: string,
  country: string,
  formatInstructions: string
): string {
  return `
${formatInstructions}
Generate a JSON object for the job title "${jobTitle}" in "${country}" that exactly matches the following schema:
JSON Schema:
{
  "jobTitle": "string",
  "country": "string",
  "salaryByExperience": {
    "intern": "string",
    "junior": "string",
    "mid": "string",
    "senior": "string",
    "expert": "string",
    "currency": "string"
  }
}
Example JSON output:
{
  "jobTitle": "Software Engineer",
  "country": "Nepal",
  "salaryByExperience": {
    "intern": "10,000",
    "junior": "20,000",
    "mid": "40,000",
    "senior": "70,000",
    "expert": "100,000",
    "currency": "NPR"
  }
}
Requirements:
- Return **only the JSON object**, with no explanations, text, or markdown.
- All fields must be filled according to the schema.
- Salaries should be realistic for the given country and job title.
- Use local currency and its code (e.g., USD, NPR, INR).
- Include all experience levels: intern, junior, mid, senior, expert.
`;
}
