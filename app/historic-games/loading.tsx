import { Table } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import { NewGameButton } from "./_components";

const HistoricGamesLoadingPage = () => {
    const games = [1, 2, 3, 4, 5];

    return (
        <div className="px-5">
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
                            Moves
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell"></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {games.map((game) => (
                        <Table.Row key={game}>
                            <Table.Cell>
                                <Skeleton />
                                <div className="block md:hidden">
                                    <Skeleton />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>

                            <Table.Cell className="hidden md:table-cell">
                                <div className="flex space-x-2">
                                    <Skeleton />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default HistoricGamesLoadingPage;
