import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditGameButton from "./EditGameButton";
import GameDetails from "./GameDetails";

const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <GameDetails game={game} />
            </Box>
            <Box>
                <EditGameButton gameId={game.id} />
            </Box>
        </Grid>
    );
};

export default GameDetailsPage;
