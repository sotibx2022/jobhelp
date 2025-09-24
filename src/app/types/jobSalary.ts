import { z } from 'zod';
export const jobSalarySchema = z.object({
  jobTitle: z.string(),
  country: z.string(),
  salaryByExperience: z.object({
    intern: z.string().regex(/^\d{1,3}(,\d{3})*$/, "Invalid salary format"),
    junior: z.string().regex(/^\d{1,3}(,\d{3})*$/, "Invalid salary format"),
    mid: z.string().regex(/^\d{1,3}(,\d{3})*$/, "Invalid salary format"),
    senior: z.string().regex(/^\d{1,3}(,\d{3})*$/, "Invalid salary format"),
    expert: z.string().regex(/^\d{1,3}(,\d{3})*$/, "Invalid salary format"),
    currency: z.string()
  })
});
export type jobSalaryType = z.infer<typeof jobSalarySchema>;
