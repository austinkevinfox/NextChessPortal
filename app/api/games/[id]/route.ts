import { gameSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    console.log("delete request", request);
    const { id } = await params;
    const game = await prisma.game.findUnique({
        where: { id: parseInt(id) },
    });

    if (!game) {
        return NextResponse.json("Game not found", { status: 400 });
    }

    await prisma.game.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({}, { status: 200 });
};

export const PATCH = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const body = await request.json();
    const validation = gameSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { id } = await params;
    const game = await prisma.game.findUnique({
        where: { id: parseInt(id) },
    });

    if (!game) {
        return NextResponse.json({ error: "Invalid game" }, { status: 404 });
    }

    const tmpEventDate = body.eventDate
        ? new Date(body.eventDate).toISOString()
        : undefined;

    const updatedGame = await prisma.game.update({
        where: { id: game.id },
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

    return NextResponse.json(updatedGame);
};
