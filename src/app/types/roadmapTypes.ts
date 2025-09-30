import { z } from "zod";
// Individual action in a task
export const RoadmapActionSchema = z.object({
  actionTitle: z.string(),
  hours: z.number().nonnegative(), // hours should be >= 0
  completed: z.boolean(),
});
// Individual task containing multiple actions
export const RoadmapTaskSchema = z.object({
  title: z.string(),
  hours: z.number().nonnegative(),
  actions: z.array(RoadmapActionSchema).nonempty(), // at least one action
});
// Roadmap level (Basic / Intermediate / Advanced)
export const RoadmapLevelSchema = z.object({
  level: z.enum(["Basic", "Intermediate", "Advanced"]),
  tasks: z.array(RoadmapTaskSchema).nonempty(), // at least one task
});
// Complete roadmap for a job
export const JobRoadmapSchema = z.object({
  jobTitle: z.string(),
  roadmap: z.array(RoadmapLevelSchema).nonempty(),
});
// TypeScript type inferred from Zod schema
export type JobRoadmap = z.infer<typeof JobRoadmapSchema>;
