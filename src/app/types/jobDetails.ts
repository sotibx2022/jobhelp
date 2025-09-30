import { z } from "zod";
export const JobBaseDetailSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
  keyResponsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"), // adjust min as needed
});
export type JobBaseDetail = z.infer<typeof JobBaseDetailSchema>;
