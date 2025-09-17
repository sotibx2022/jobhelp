export const extractText = (response: any): string => {
    if (typeof response === 'string') {
        return response;
    } else {
        if (Array.isArray(response)) {
            return response.map((responseObject: any) => {
                return typeof responseObject.text === 'string' ? responseObject.text : ''
            }).join('')
        } else {
            return ''
        }
    }
}
export const findJson = (content: string): string => {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return "Error"
  } else {
    const jsonString = jsonMatch[0];
    return jsonString
  }
}