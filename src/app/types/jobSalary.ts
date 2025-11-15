import { z } from "zod";
export const jobSalarySchema = z.object({
  jobTitle: z.string(),
  country: z.string(),
  salaryByExperience: z.object({
    intern: z.number(),
    junior: z.number(),
    mid: z.number(),
    senior: z.number(),
    expert: z.number(),
    currency: z.string()
  })
});
export type jobSalaryType = z.infer<typeof jobSalarySchema>;
