import { z } from "zod";

export const createGameSchema = z.object({
    title: z.string().min(1).max(255),
    white: z.string().min(1).max(190),
    black: z.string().min(1).max(190),
    result: z.string(),
    moves: z.string(),
});
