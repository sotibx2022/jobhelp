import { z } from "zod";
export const ContentSchema = z.object({
  actionTitle: z.string(),
  subContents: z.array(z.string())
})
export const ContentsSchema = z.array(ContentSchema);
export type ContentType = z.infer<typeof ContentSchema>;
export type ContentsType = z.infer<typeof ContentsSchema>;
export interface SingleRoadMapSubContent {
  actionSubTitle: string,
  checked: boolean,
}
export interface ContentUIType {
  actionTitle: string;
  subContents: SingleRoadMapSubContent[];
}
// Array of content items
export type ContentsUIType = ContentUIType[];
export interface IRoadMapContentsDBType {
  userId: Object,
  jobTitle: string,
  roadMapContents: ContentUIType[]
}