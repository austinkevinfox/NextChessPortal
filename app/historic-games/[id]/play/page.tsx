import ControlPanel from "@/app/components/ControlPanel";
import GameTable from "@/app/components/GameTable";
import prisma from "@/prisma/client";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";


const PlayHistoricGamePage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return (
        <>
            <Flex gap="5" justify="center" align="center" className="mb-3">
                <Heading as="h2">{game.title}</Heading>
                <ControlPanel />
            </Flex>
            <GameTable />
        </>
    );
};

export default PlayHistoricGamePage;
