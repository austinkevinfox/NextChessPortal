import {
    WhiteBishop,
    WhiteKing,
    WhiteKnight,
    WhitePawn,
    WhiteQueen,
    WhiteRook,
} from "@/app/public/svg-no-shadow";
import { Table } from "@radix-ui/themes";
import Image from "next/image";
import CryptoDropZone from "../CryptoDropZone/CryptoDropZone";

const PieceCoinTable = () => {
    const profilePieces = [
        { name: "king", component: WhiteKing },
        { name: "queen", component: WhiteQueen },
        { name: "rook", component: WhiteRook },
        { name: "bishop", component: WhiteBishop },
        { name: "knight", component: WhiteKnight },
        { name: "pawn", component: WhitePawn },
    ];

    return (
        <Table.Root variant="surface" className="h-fit">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="table-cell">
                        Piece
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="table-cell">
                        Coin
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {profilePieces.map((piece) => (
                    <Table.Row key={piece.name}>
                        <Table.Cell className="table-cell">
                            {piece.component && (
                                <Image
                                    src={piece.component!}
                                    alt={piece.name}
                                    className={`w-8`}
                                />
                            )}
                        </Table.Cell>
                        <Table.Cell className="table-cell">
                            <CryptoDropZone pieceName={piece.name} />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export default PieceCoinTable;
