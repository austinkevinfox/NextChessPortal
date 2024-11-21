import { BoardPositionHash } from "@/app/Interfaces";
import {
    getEastRank,
    getNorthFile,
    getSouthFile,
    getThreatsByPiece,
    getWestRank,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";

export const getAlgebraicRookMoves = (
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

    let rookMoves = [...northFile, ...eastRank, ...southFile, ...westRank];

    rookMoves = omitKingExposingThreats(
        file,
        rank,
        rookMoves,
        boardPositions,
        activePlayer
    );

    return rookMoves;
};

export const getRookThreats = (
    boardPositions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] =>
    getThreatsByPiece({
        boardPositions,
        activePlayer,
        pieceName: "rook",
        callback: getAlgebraicRookMoves,
    });
