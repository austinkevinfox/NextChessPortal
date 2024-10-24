import { nullable, z } from "zod";

export const createGameSchema = z.object({
    title: z.string().min(1, "Required field").max(255),
    event: z.string(),
    eventDate: z.string().date(), // Refactor with improved zod configuration
    location: z.string(),
    white: z.string().min(1, "Required field").max(190),
    black: z.string().min(1, "Required field").max(190),
    result: z.string(),
    moves: z.string(),
    url: z.string(),
});
