import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createGameSchema = z.object({
    title: z.string().min(1).max(255),
    white: z.string().min(1).max(190),
    black: z.string().min(1).max(190),
});

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validation = createGameSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newGame = await prisma.game.create({
        data: { title: body.title, white: body.white, black: body.black },
    });

    return NextResponse.json(newGame, { status: 201 });
};
