import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { GameStatusBadge } from "../_components";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

const GameDetailsPage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <Heading>{game.title}</Heading>
                <Flex gap="2" my="2" align="center">
                    <GameStatusBadge status={game.result} />
                    <Text size="1">{game.eventDate.toDateString()}</Text>
                </Flex>
                {game.event && (
                    <Flex gap="2" my="2" align="center">
                        <Text>Event:</Text>
                        <Text>{game.event}</Text>
                    </Flex>
                )}
                <Flex gap="2" my="2" align="center">
                    <Text>White:</Text>
                    <Text>{game.white}</Text>
                </Flex>
                <Flex gap="2" my="2" align="center">
                    <Text>Black:</Text>
                    <Text>{game.black}</Text>
                </Flex>
                <Card>{game.moves}</Card>
            </Box>
            <Box>
                <Button>
                    <FaEdit />
                    <Link href={`/historic-games/${game.id}/edit`}>Edit</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default GameDetailsPage;
