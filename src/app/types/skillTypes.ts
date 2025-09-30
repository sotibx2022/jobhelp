import { z } from "zod";
export const skillsSchema = z.object({
  RoleSkills: z.object({
    Fundamentals: z.array(z.string()),
    TechnicalSkills: z.array(z.string()),
    ToolsAndTechnologies: z.array(z.string()),
    ProcessesAndMethods: z.array(z.string()),
    DataAndAnalytics: z.array(z.string()),
    SoftSkills: z.array(z.string()),
    RegulatoryAndCompliance: z.array(z.string())
  })
});
export type skillsType = z.infer<typeof skillsSchema>