import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import GameForm from "../../_components/GameForm";

const EditGamePage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return <GameForm game={game} />;
};

export default EditGamePage;
