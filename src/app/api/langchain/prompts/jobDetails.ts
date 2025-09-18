export const jobDetailsPrompts = (jobTitleInput: string): string => {
    return `
You are an assistant that returns structured JSON about job profiles.
### Input
A user provides a job title (may include typos or symbols): **"${jobTitleInput}"**
### Example Output
\`\`\`json
{
  "jobTitle": "Backend Developer",
  "jobDescription": "Responsible for designing, building, and maintaining server-side logic, databases, and APIs.",
  "keyResponsibilities": [
    "Develop and maintain server-side logic and APIs",
    "Optimize database performance and ensure data security",
    "Collaborate with frontend developers to integrate user-facing elements"
  ]
}
\`\`\`
### Instructions
Return only valid JSON strictly matching the structure above. Do not include code, explanations, or extra text.
`;
};
