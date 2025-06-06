import { BoardPositionHash } from "@/app/Interfaces";
import { Files } from "@/app/components/PositionConstants";
import {
    getThreatsByPiece,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";

declare type FileType = keyof typeof Files;

export const getAlgebraicKnightMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    activePlayer: string
): string[] => {
    let knightMoves = getKnightSquaresBySteps(file, rankNumber);

    knightMoves = omitKingExposingThreats(
        file,
        rankNumber.toString(),
        knightMoves,
        boardPositions,
        activePlayer
    );

    return knightMoves;
};

export const getKnightThreats = (
    boardPositions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] =>
    getThreatsByPiece({
        boardPositions,
        activePlayer,
        pieceName: "knight",
        callback: getAlgebraicKnightMoves,
    });

export const getIsKnightDefendingSquare = ({
    defendingPlayer,
    boardPositions,
    square,
}: {
    defendingPlayer: "white" | "black";
    boardPositions: BoardPositionHash;
    square: string;
}): boolean => {
    let isKnightDefending = false;
    const knightPositions = Object.keys(boardPositions).filter(
        (notation) =>
            boardPositions[notation]?.color === defendingPlayer &&
            boardPositions[notation]?.code === "N"
    );

    if (knightPositions.length === 0) {
        return false;
    }

    const [fileStr, rankStr] = square.split("");
    const rankNumber = parseInt(rankStr);
    const knightMoves = getKnightSquaresBySteps(fileStr, rankNumber);

    isKnightDefending = knightPositions.some((notation) =>
        knightMoves.includes(notation)
    );
    return isKnightDefending;
};

const getKnightSquaresBySteps = (
    file: string,
    rankNumber: number
): string[] => {
    let knightSquares: string[] = [];
    const fileIndex = Files[file as FileType];

    [-2, -1, 1, 2].forEach((i) => {
        const fileString: string | undefined = Files[fileIndex + i];

        if (fileString) {
            if (i === -2 || i === 2) {
                [-1, 1].forEach((step) => {
                    const newPositions = getAlgebraicKnightPositionsByStep(
                        fileString,
                        rankNumber,
                        step
                    );
                    knightSquares = [...knightSquares, ...newPositions];
                });
            } else {
                [-2, 2].forEach((step) => {
                    const newPositions = getAlgebraicKnightPositionsByStep(
                        fileString,
                        rankNumber,
                        step
                    );
                    knightSquares = [...knightSquares, ...newPositions];
                });
            }
        }
    });
    return knightSquares;
};

const getAlgebraicKnightPositionsByStep = (
    file: string,
    rank: number,
    step: number
): string[] => {
    const result: string[] = [];
    const tmpRank = rank + step;
    if (tmpRank >= 1 && tmpRank <= 8) {
        result.push(file + tmpRank);
    }
    return result;
};
