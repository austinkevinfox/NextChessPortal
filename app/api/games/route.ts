import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { gameSchema } from "@/app/validationSchemas";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validation = gameSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const tmpEventDate = body.eventDate
        ? new Date(body.eventDate).toISOString()
        : undefined;

    const newGame = await prisma.game.create({
        data: {
            title: body.title,
            event: body.event,
            eventDate: tmpEventDate,
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
