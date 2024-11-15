import { BoardPositionHash } from "@/app/Interfaces";
import {
    getNorthFile,
    getEastRank,
    getSouthFile,
    getWestRank,
    getNorthEastDiagonal,
    getNorthWestDiagonal,
    getSouthEastDiagonal,
    getSouthWestDiagonal,
    getOpposingPiecePositions,
    // omitKingExposingThreats,
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
    positions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] => {
    let queenThreats: string[] = [];
    const opposingQueenPositions = getOpposingPiecePositions({
        boardPositions: positions,
        activePlayer,
        pieceName: "queen",
    });
    opposingQueenPositions.forEach((queenPosition) => {
        const [file, rank] = queenPosition.split("");
        const queenMoves = getAlgebraicQueenMoves(
            file,
            parseInt(rank),
            positions,
            activePlayer === "white" ? "black" : "white"
        );
        queenThreats = [...queenThreats, ...queenMoves];
    });

    return queenThreats;
};
