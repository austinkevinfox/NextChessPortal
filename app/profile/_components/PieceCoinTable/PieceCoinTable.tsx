import { Table } from "@radix-ui/themes";
import CryptoSelector from "../CryptoSelector/CryptoSelector";
import {
    WhiteBishop,
    WhiteKing,
    WhiteKnight,
    WhitePawn,
    WhiteQueen,
    WhiteRook,
} from "@/app/public/svg-no-shadow";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import Image from "next/image";

const PieceCoinTable = () => {
    const { pieceCoinHash, setCoinToPiece } = useCryptoPieceStore();

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
    );
};

export default PieceCoinTable;
