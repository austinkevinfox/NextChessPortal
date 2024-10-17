import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createGameSchema } from "@/app/validationSchemas";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validation = createGameSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newGame = await prisma.game.create({
        data: {
            title: body.title,
            event: body.event,
            location: body.location,
            white: body.white,
            black: body.black,
            result: body.result,
            moves: body.moves,
            url: body.url,
        },
    });

    return NextResponse.json(newGame, { status: 201 });
};
