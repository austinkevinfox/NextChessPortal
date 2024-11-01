import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditGameButton from "./EditGameButton";
import GameDetails from "./GameDetails";
import DeleteGameButton from "./DeleteGameButton";

const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return (
        <Grid columns={{ initial: "1", md: "5" }} gap="5">
            <Box className="col-span-4">
                <GameDetails game={game} />
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <EditGameButton gameId={game.id} />
                    <DeleteGameButton gameId={game.id} />
                </Flex>
            </Box>
        </Grid>
    );
};

export default GameDetailsPage;
