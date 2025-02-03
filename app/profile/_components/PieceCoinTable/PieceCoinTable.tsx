import { Piece } from "@/app/Interfaces";
import {
    BlackBishop,
    BlackKing,
    BlackKnight,
    BlackPawn,
    BlackQueen,
    BlackRook,
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

interface Props {
    selectedColor: "white" | "black";
}

const PieceCoinTable = ({ selectedColor }: Props) => {
    const whitePieces: Piece[] = [
        { name: "king", code: "K", color: "white", component: WhiteKing },
        { name: "queen", code: "Q", color: "white", component: WhiteQueen },
        { name: "rook", code: "R", color: "white", component: WhiteRook },
        { name: "bishop", code: "B", color: "white", component: WhiteBishop },
        { name: "knight", code: "N", color: "white", component: WhiteKnight },
        { name: "pawn", code: "P", color: "white", component: WhitePawn },
    ];
    const blackPieces: Piece[] = [
        { name: "king", code: "K", color: "black", component: BlackKing },
        { name: "queen", code: "Q", color: "black", component: BlackQueen },
        { name: "rook", code: "R", color: "black", component: BlackRook },
        { name: "bishop", code: "B", color: "black", component: BlackBishop },
        { name: "knight", code: "N", color: "black", component: BlackKnight },
        { name: "pawn", code: "P", color: "black", component: BlackPawn },
    ];

    const profilePieces: Piece[] = [...whitePieces, ...blackPieces];

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
                {profilePieces
                    .filter((piece) => piece.color === selectedColor)
                    .map((piece) => (
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
                                <CryptoDropZone
                                    color={selectedColor}
                                    pieceName={piece.name}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table.Root>
    );
};

export default PieceCoinTable;
