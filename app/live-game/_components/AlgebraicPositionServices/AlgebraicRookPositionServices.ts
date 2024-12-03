import { BoardPositionHash } from "@/app/Interfaces";
import {
    getEastRank,
    getNorthFile,
    getSouthFile,
    getThreatsByPiece,
    getWestRank,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";
import { isFileClear, isRankClear } from "./ClearPathServices";

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

export const getIsRookDefendingSquare = ({
    defendingPlayer,
    boardPositions,
    square,
}: {
    defendingPlayer: "white" | "black";
    boardPositions: BoardPositionHash;
    square: string;
}): boolean => {
    const [fileStr, rankStr] = square.split("");
    let isRookDefending = false;
    const rookPositions = Object.keys(boardPositions).filter(
        (notation) =>
            boardPositions[notation]?.color === defendingPlayer &&
            boardPositions[notation]?.code === "R"
    );

    rookPositions.every((position) => {
        const [rookFile, rookRank] = position.split("");
        isRookDefending = false;

        if (rookFile === fileStr) {
            // traverse file
            isRookDefending = isFileClear({
                boardPositions,
                positionA: position,
                positionB: square,
            });
        }
        if (rookRank === rankStr) {
            // traverse rank
            isRookDefending = isRankClear({
                boardPositions,
                positionA: position,
                positionB: square,
            });
        }
        return !isRookDefending;
    });

    return isRookDefending;
};
