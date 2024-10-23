import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) {
        return NextResponse.json("Game not found", { status: 400 });
    }

    await prisma.game.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json({}, { status: 200 });
};
