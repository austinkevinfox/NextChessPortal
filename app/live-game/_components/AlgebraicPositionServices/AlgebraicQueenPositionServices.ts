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
} from "./AlgebraicPositionServices";

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

    // queenMoves = omitKingExposingThreats(
    //     file,
    //     rank,
    //     queenMoves,
    //     boardPositions,
    //     activePlayer
    // );

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
