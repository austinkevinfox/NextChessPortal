"use client";
import {
    WhiteBishop,
    WhiteKing,
    WhiteKnight,
    WhitePawn,
    WhiteQueen,
    WhiteRook,
} from "@/app/public/svg-no-shadow";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import useStepStore from "@/app/state-management/store";
import { Flex, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect } from "react";
import CryptoSelector from "./_components/CryptoSelector/CryptoSelector";
import CryptoSearch from "../components/CryptoSearch";

const ProfilePage = () => {
    const { setLoaded } = useStepStore();
    const { pieceCoinHash, setCoinToPiece } = useCryptoPieceStore();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const profilePieces = [
        { name: "king", component: WhiteKing },
        { name: "queen", component: WhiteQueen },
        { name: "rook", component: WhiteRook },
        { name: "bishop", component: WhiteBishop },
        { name: "knight", component: WhiteKnight },
        { name: "pawn", component: WhitePawn },
    ];

    return (
        <div className="h-full flex flex-col my-1 md:flex-row">
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
                                <CryptoSelector
                                    pieceName={piece.name}
                                    selectedCoin={pieceCoinHash[piece.name]}
                                    onCoinSelection={setCoinToPiece}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <CryptoSearch />
        </div>
    );
};

export default ProfilePage;
