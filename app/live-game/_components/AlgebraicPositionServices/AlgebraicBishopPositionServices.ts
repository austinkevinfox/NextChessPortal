import { BoardPositionHash } from "@/app/Interfaces";
import {
    getNorthEastDiagonal,
    getNorthWestDiagonal,
    getSouthEastDiagonal,
    getSouthWestDiagonal,
    getThreatsByPiece,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";
import { isDiagonalClear } from "./ClearPathServices";

export const getAlgebraicBishopMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    activePlayer: string
): string[] => {
    const rank = rankNumber.toString();
    const northWestDiagonal = getNorthWestDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const northEastDiagonal = getNorthEastDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southWestDiagonal = getSouthWestDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southEastDiagonal = getSouthEastDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );

    let bishopMoves = [
        ...northWestDiagonal,
        ...northEastDiagonal,
        ...southWestDiagonal,
        ...southEastDiagonal,
    ];

    bishopMoves = omitKingExposingThreats(
        file,
        rank,
        bishopMoves,
        boardPositions,
        activePlayer
    );

    return bishopMoves;
};

export const getBishopThreats = (
    boardPositions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] =>
    getThreatsByPiece({
        boardPositions,
        activePlayer,
        pieceName: "bishop",
        callback: getAlgebraicBishopMoves,
    });

export const getIsBishopDefendingSquare = ({
    defendingPlayer,
    boardPositions,
    square,
}: {
    defendingPlayer: "white" | "black";
    boardPositions: BoardPositionHash;
    square: string;
}): boolean => {
    let isBishopDefending = false;
    const bishopPositions = Object.keys(boardPositions).filter(
        (notation) =>
            boardPositions[notation]?.color === defendingPlayer &&
            boardPositions[notation]?.code === "B"
    );

    bishopPositions.every((position) => {
        isBishopDefending = isDiagonalClear({
            boardPositions,
            positionA: position,
            positionB: square,
        });

        return !isBishopDefending;
    });

    return isBishopDefending;
};
