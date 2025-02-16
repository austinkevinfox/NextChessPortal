import ClientPanel from "@/app/components/ClientPanel";
import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

const PlayHistoricGamePage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const game = await prisma.game.findUnique({
        where: { id: parseInt(id) },
    });

    if (!game) notFound();

    return (
        <>
            <Heading as="h2">{game.title}</Heading>
            <ClientPanel game={game} />
        </>
    );
};

export default PlayHistoricGamePage;
