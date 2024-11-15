import { BoardPositionHash } from "@/app/Interfaces";
import {
    getNorthFile,
    getEastRank,
    getSouthFile,
    getWestRank,
    getOpposingPiecePositions,
    // omitKingExposingThreats,
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

    // rookMoves = omitKingExposingThreats(
    //     file,
    //     rank,
    //     rookMoves,
    //     boardPositions,
    //     activePlayer
    // );

    return rookMoves;
};

export const getRookThreats = (
    positions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] => {
    let rookThreats: string[] = [];
    const opposingRookPositions = getOpposingPiecePositions({
        boardPositions: positions,
        activePlayer,
        pieceName: "rook",
    });
    opposingRookPositions.forEach((rookPosition) => {
        const [file, rank] = rookPosition.split("");
        const rookMoves = getAlgebraicRookMoves(
            file,
            parseInt(rank),
            positions,
            activePlayer === "white" ? "black" : "white"
        );
        rookThreats = [...rookThreats, ...rookMoves];
    });

    return rookThreats;
};
