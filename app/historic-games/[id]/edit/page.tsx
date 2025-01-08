import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import GameForm from "../../_components/GameForm";

const EditGamePage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const game = await prisma.game.findUnique({
        where: { id: parseInt(id) },
    });

    if (!game) notFound();

    return <GameForm game={game} />;
};

export default EditGamePage;
