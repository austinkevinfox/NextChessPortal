import { BoardPositionHash } from "@/app/Interfaces";
import { Files } from "./AlgebraicNotationConstants";
import { getThreatsByPiece, omitKingExposingThreats } from "./AlgebraicPositionServices";

declare type FileType = keyof typeof Files;

export const getAlgebraicKnightMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    activePlayer: string
): string[] => {
    let knightMoves: string[] = [];
    const fileIndex = Files[file as FileType];
    const rank = rankNumber.toString();

    [-2, -1, 1, 2].forEach((i) => {
        let fileString: string | undefined = Files[fileIndex + i];

        if (fileString) {
            if (i === -2 || i === 2) {
                [-1, 1].forEach((step) => {
                    let newPositions = getAlgebraicKnightPositionsByStep(
                        fileString,
                        rankNumber,
                        step
                    );
                    knightMoves = [...knightMoves, ...newPositions];
                });
            } else {
                [-2, 2].forEach((step) => {
                    let newPositions = getAlgebraicKnightPositionsByStep(
                        fileString,
                        rankNumber,
                        step
                    );
                    knightMoves = [...knightMoves, ...newPositions];
                });
            }
        }
    });

    knightMoves = omitKingExposingThreats(
        file,
        rank,
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

const getAlgebraicKnightPositionsByStep = (
    file: string,
    rank: number,
    step: number
): string[] => {
    let result: string[] = [];
    let tmpRank = rank + step;
    if (tmpRank >= 1 && tmpRank <= 8) {
        result.push(file + tmpRank);
    }
    return result;
};
