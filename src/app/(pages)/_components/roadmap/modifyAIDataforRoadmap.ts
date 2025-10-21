import { ContentType, ContentUIType } from "@/app/types/roadmapTypes";
export const modifyAIDataforRoadMap = (data: ContentType[]): ContentUIType[] => {
    const modifiedJobContents =
        data.map((individualData: ContentType) => ({
            actionTitle: individualData.actionTitle,
            subContents: individualData.subContents.map((singleString: string) => ({
                actionSubTitle: singleString,
                checked: false,
            })),
        })) || [];
    return modifiedJobContents
}