import { ContentUIType } from "@/app/types/roadmapTypes";
export const useOverallScore = (contents: ContentUIType[]): number => {
  if(!contents) return 0;
  const totalLength = contents?.reduce((acc, content) => acc + content.subContents.length, 0);
  if (totalLength === 0) return 0; // Guard against division by zero
  const overallScore = contents.reduce((acc, content) => {
    return acc + content.subContents.reduce((subAcc, subContent) => {
      return subAcc + (subContent.checked ? 1 : 0);
    }, 0);
  }, 0);
  const percentage = Math.floor((overallScore / totalLength) * 100);
  return percentage;
};
