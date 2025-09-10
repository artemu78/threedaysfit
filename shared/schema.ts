import { z } from "zod";

export const workoutLogSchema = z.object({
  id: z.string(),
  date: z.string(),
  day: z.enum(["upper", "back", "legs"]),
  exercise: z.string(),
  sets: z.number().min(1).max(10),
  reps: z.number().min(1).max(50),
  weight: z.number().min(0),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const exerciseSchema = z.object({
  name: z.string(),
  primaryMuscles: z.string(),
  secondaryMuscles: z.string().optional(),
  sets: z.number(),
  reps: z.string(),
  rest: z.string(),
  instructions: z.array(z.string()),
  imageAlt: z.string(),
  image: z.string().optional(),
  details: z.string().optional(),
});

export const workoutDaySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  exercises: z.array(exerciseSchema),
  warmup: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })),
});

export type WorkoutLog = z.infer<typeof workoutLogSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type WorkoutDay = z.infer<typeof workoutDaySchema>;
