import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return (
        <>
            <p>{game.title}</p>
            <p>{game.white}</p>
            <p>{game.black}</p>
            <p>{game.result}</p>
            <p>{game.addedAt.toString()}</p>
        </>
    );
};

export default GameDetailsPage;
