import { BoardPositionHash } from "@/app/Interfaces";
import {
    getEastRank,
    getNorthEastDiagonal,
    getNorthFile,
    getNorthWestDiagonal,
    getSouthEastDiagonal,
    getSouthFile,
    getSouthWestDiagonal,
    getThreatsByPiece,
    getWestRank,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";
import { isDiagonalClear, isFileClear, isRankClear } from "./ClearPathServices";

export const getAlgebraicQueenMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    activePlayer: string
): string[] => {
    const rank = rankNumber.toString();
    const northFile = getNorthFile(file + rank, boardPositions, activePlayer);
    const eastRank = getEastRank(file + rank, boardPositions, activePlayer);
    const southFile = getSouthFile(file + rank, boardPositions, activePlayer);
    const westRank = getWestRank(file + rank, boardPositions, activePlayer);
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

    let queenMoves = [
        ...northFile,
        ...eastRank,
        ...southFile,
        ...westRank,
        ...northWestDiagonal,
        ...northEastDiagonal,
        ...southWestDiagonal,
        ...southEastDiagonal,
    ];

    queenMoves = omitKingExposingThreats(
        file,
        rank,
        queenMoves,
        boardPositions,
        activePlayer
    );

    return queenMoves;
};

export const getQueenThreats = (
    boardPositions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] =>
    getThreatsByPiece({
        boardPositions,
        activePlayer,
        pieceName: "queen",
        callback: getAlgebraicQueenMoves,
    });

export const getIsQueenDefendingSquare = ({
    defendingPlayer,
    boardPositions,
    square,
}: {
    defendingPlayer: "white" | "black";
    boardPositions: BoardPositionHash;
    square: string;
}): boolean => {
    const [fileStr, rankStr] = square.split("");
    let isQueenDefending = false;
    const queenPositions = Object.keys(boardPositions).filter(
        (notation) =>
            boardPositions[notation]?.color === defendingPlayer &&
            boardPositions[notation]?.code === "Q"
    );

    queenPositions.every((position) => {
        const [queenFile, queenRank] = position.split("");
        isQueenDefending = false;

        if (queenFile === fileStr) {
            // traverse file
            isQueenDefending = isFileClear({
                boardPositions,
                positionA: position,
                positionB: square,
            });
        }
        if (queenRank === rankStr) {
            // traverse rank
            isQueenDefending = isRankClear({
                boardPositions,
                positionA: position,
                positionB: square,
            });
        }

        if (queenFile !== fileStr && queenRank !== rankStr) {
            isQueenDefending = isDiagonalClear({
                boardPositions,
                positionA: position,
                positionB: square,
            });
        }

        return !isQueenDefending;
    });

    return isQueenDefending;
};
