import { z } from "zod";
export const JobBaseDetailSchema = z.object({
  jobTitle: z
    .string()
    .min(4, "Job title must be at least 4 characters")
    .max(100, "Job title must be at most 100 characters"),
  jobDescription: z
    .string()
    .min(100, "Description must be at least 50 characters")
    .max(1000, "Description must be at most 1000 characters"), 
  keyResponsibilities: z
    .array(
      z
        .string()
        .min(50, "Each responsibility must be at least 20 characters")
        .max(200, "Each responsibility must be at most 300 characters") 
    )
    .min(1, "At least one responsibility is required"),
});
