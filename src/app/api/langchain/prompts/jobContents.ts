export const jobContentsPrompt = (jobTitle: string, formatInstructions: string): string => {
  return `You are an expert in learning and development.  
Generate a structured **JSON array** of objects that outlines the learning contents for the job title: **${jobTitle}**.  
Guidelines:
- Return a **single JSON array**, not multiple top-level objects.
- Each object must have:
  - "actionTitle": concise string
  - "subContents": array of many short, concise strings
- Do not include any explanation, notes, or markdown.
- Do not wrap in triple backticks.
- Do not add text before or after the JSON.
Strictly follow this structure:
[
  {
    "actionTitle": "string",
    "subContents": ["string", "string", ...]
  },
  ...
]
${formatInstructions}`;
};
