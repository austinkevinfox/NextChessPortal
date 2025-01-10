import { Link } from "@/app/components";
import {
    GameStatusBadge,
    GridButtons,
    NewGameButton,
} from "@/app/historic-games/_components";
import { Game } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { getHistoricGames } from "./services";

const HistoricGames = async () => {
    const games: Game[] = await getHistoricGames();

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
                                <Link
                                    href={`historic-games${
                                        game.event === "static-game"
                                            ? "/static-game"
                                            : ""
                                    }/${game.id}`}
                                >
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
                                <GridButtons game={game} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export const dynamic = "force-dynamic";

export default HistoricGames;
