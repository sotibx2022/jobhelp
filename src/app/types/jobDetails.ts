import { z } from "zod";
export const JobBaseDetailSchema = z.object({
  jobTitle: z
    .string()
    .min(4, "Job title must be at least 4 characters")
    .max(50, "Job title must be at most 50 characters")
    .regex(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers, and spaces are allowed"),
  jobDescription: z
    .string()
    .min(100, "Description must be at least 100 characters")
    .max(200, "Description must be at most 200 characters")
    .regex(/^[a-zA-Z0-9 .,]+$/, "No special characters allowed except spaces, periods, and commas"),
  keyResponsibilities: z
    .array(
      z
        .string()
        .min(20, "Each responsibility must be at least 20 characters")
        .max(50, "Each responsibility must be at most 50 characters")
        .regex(
          /^[a-zA-Z0-9 ]+$/,
          "Responsibilities can only contain letters, numbers, and spaces"
        )
    )
    .min(1, "At least one responsibility is required"),
});
