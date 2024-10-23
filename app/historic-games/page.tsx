import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { FaChessBoard } from "react-icons/fa";
import { PiTextAlignLeft } from "react-icons/pi";
import { RxOpenInNewWindow } from "react-icons/rx";
import { Link } from "@/app/components";
import { GameStatusBadge, NewGameButton } from "./_components";
import DeleteButton from "./_components/DeleteButton";

const HistoricGames = async () => {
    const games = await prisma.game.findMany();

    return (
        <>
            <NewGameButton />

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
                            Opening
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell"></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {games.map((game) => (
                        <Table.Row key={game.id}>
                            <Table.Cell>
                                <Link href={`/historic-games/${game.id}`}>
                                    {game.title}
                                </Link>
                                <div className="block md:hidden">
                                    <GameStatusBadge status={game.result} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {game.white}
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {game.black}
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <GameStatusBadge status={game.result} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <div className="w-40 truncate">
                                    {game.moves}
                                </div>
                            </Table.Cell>

                            <Table.Cell className="hidden md:table-cell">
                                <div className="flex space-x-2">
                                    <NextLink
                                        href={`/historic-games/${game.id}`}
                                    >
                                        <PiTextAlignLeft />
                                    </NextLink>

                                    {game.moves?.length &&
                                        game.moves.length > 0 && (
                                            <NextLink
                                                href={`/historic-games/${game.id}/play`}
                                            >
                                                <FaChessBoard />
                                            </NextLink>
                                        )}
                                    {game.url && (
                                        <NextLink
                                            href={game.url}
                                            target="_blank"
                                        >
                                            <RxOpenInNewWindow />
                                        </NextLink>
                                    )}
                                    <DeleteButton gameId={game.id} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export default HistoricGames;
