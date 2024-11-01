import { z } from "zod";

export const gameSchema = z.object({
    title: z.string().min(1, "Required field").max(255),
    event: z.string().optional(),
    eventDate: z.string().date().optional(), // Refactor with improved zod configuration
    location: z.string().optional(),
    white: z.string().min(1, "Required field").max(190),
    black: z.string().min(1, "Required field").max(190),
    result: z.string().optional(),
    moves: z.string().optional(),
    url: z.string().optional(),
});
