import { ContentUIType } from "@/app/types/roadmapTypes";
export const useOverallLength = (contents: ContentUIType[]): number => {
    const totalLength = contents.reduce(
        (acc, content) => acc + content.subContents.length,
        0
    );
    return totalLength
}
