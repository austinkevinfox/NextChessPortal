"use client";
import {
    WhiteBishop,
    WhiteKing,
    WhiteKnight,
    WhitePawn,
    WhiteQueen,
    WhiteRook,
} from "@/app/public/svg-no-shadow";
import useStepStore from "@/app/state-management/store";
import { Table } from "@radix-ui/themes";
import { useEffect } from "react";

import Image from "next/image";
import CryptoSelector from "./_components/CryptoSelector/CryptoSelector";

const ProfilePage = () => {
    const { setLoaded } = useStepStore();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const profilePieces = [
        { name: "King", component: WhiteKing, crypto: "btc" },
        { name: "Queen", component: WhiteQueen },
        { name: "Rook", component: WhiteRook },
        { name: "Bishop", component: WhiteBishop },
        { name: "Knight", component: WhiteKnight },
        { name: "Pawn", component: WhitePawn },
    ];

    return (
        <>
            <Table.Root variant="surface" className="h-fit">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell className="table-cell">
                            Piece
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="table-cell">
                            Crypto
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
                                <CryptoSelector />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export default ProfilePage;
