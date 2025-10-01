export const extractText = (response: any): string => {
  if (typeof response === 'string') {
    return response;
  } else {
    if (typeof response === 'object') {
      return response.content
    } else {
      return ""
    }
  }
}
export const findJsonArray = (content: string): string | null => {
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return null; 
  }
  return jsonMatch[0];
};
export const findJson = (content: string): string => {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return "Error"
  } else {
    const jsonString = jsonMatch[0];
    return jsonString
  }
}
export const cleanJsonString = (str: string) =>{
  return str
    .replace(/```json/g, "") 
    .replace(/```/g, "")
    .trim();
}