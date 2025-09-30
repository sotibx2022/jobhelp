import { z } from "zod";
export const skillsSchema = z.object({
  RoleSkills: z.object({
    FundaMental_Skills: z.array(z.string()),
    Technical_Skills: z.array(z.string()),
    Tool_Skills: z.array(z.string()),
    Process_Skills: z.array(z.string()),
    Analytics_Skills: z.array(z.string()),
    Soft_Skills: z.array(z.string()),
    Compliance_Skills: z.array(z.string())
  })
});
export type skillsType = z.infer<typeof skillsSchema>