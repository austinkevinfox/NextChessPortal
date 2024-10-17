import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { FaChessBoard } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";

const HistoricGames = async () => {
    const games = await prisma.game.findMany();

    return (
        <div className="px-5">
            <div className="mb-5">
                <Button>
                    <Link href="/historic-games/new">New Game</Link>
                </Button>
            </div>

            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            White
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Black
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Result
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Moves
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell"></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {games.map((game) => (
                        <Table.Row key={game.id}>
                            <Table.Cell>
                                {game.title}
                                <div className="block md:hidden">
                                    Result: {game.result}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {game.white}
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {game.black}
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {game.result}
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {game.moves}
                            </Table.Cell>

                            <Table.Cell className="hidden md:table-cell">
                                <div className="flex space-x-2">
                                    {game.moves?.length &&
                                        game.moves.length > 0 && (
                                            <FaChessBoard />
                                        )}
                                    {game.url && (
                                        <Link
                                            href={game.url}
                                            target="_blank"
                                        >
                                            <RxOpenInNewWindow />
                                        </Link>
                                    )}
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default HistoricGames;
