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
import { Box, Flex, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import CryptoDropZone from "../CryptoDropZone/CryptoDropZone";
import { Piece } from "@/app/Interfaces";
import ColorButton from "./ColorButton";

const PieceCoinTable = () => {
    const [selectedColor, setSelectedColor] = useState("white");
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
                        <div>Piece</div>
                        <Flex gap="1">
                            <ColorButton
                                color="white"
                                isSelected={selectedColor === "white"}
                                onClick={() => setSelectedColor("white")}
                            />
                            <ColorButton
                                color="black"
                                isSelected={selectedColor === "black"}
                                onClick={() => setSelectedColor("black")}
                            />
                        </Flex>
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
                                <CryptoDropZone pieceName={piece.name} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table.Root>
    );
};

export default PieceCoinTable;
