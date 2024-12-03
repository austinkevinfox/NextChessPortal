import { Files, FileType } from "@/app/components/PositionConstants";
import { BoardPositionHash, EnPassan } from "@/app/Interfaces";
import {
    getNorthEastDiagonal1Space,
    getNorthFile1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthFile1Space,
    getSouthWestDiagonal1Space,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";

export const getAlgebraicPawnMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    enPassanNotation: null,
    activePlayer: string
): string[] => {
    let pawnMoves: string[];
    const rank = rankNumber.toString();

    if (activePlayer === "white") {
        const northFile = getNorthFile1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const northEastDiagonal = getNorthEastDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const northWestDiagonal = getNorthWestDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );

        pawnMoves = [...northFile];

        if (rank === "2") {
            // Two square open is allowed
            pawnMoves.push(`${file}4`);
        }

        [northEastDiagonal, northWestDiagonal].forEach((diagonal) => {
            if (
                isPawnAbleToCapture(
                    boardPositions,
                    diagonal,
                    enPassanNotation,
                    activePlayer
                )
            ) {
                pawnMoves = [...pawnMoves, ...diagonal];
            }
        });
    } else {
        const southFile = getSouthFile1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const southEastDiagonal = getSouthEastDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const southWestDiagonal = getSouthWestDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );

        pawnMoves = [...southFile];

        if (rank === "7") {
            // Two square open is allowed
            pawnMoves.push(`${file}5`);
        }

        [southEastDiagonal, southWestDiagonal].forEach((diagonal) => {
            if (
                isPawnAbleToCapture(
                    boardPositions,
                    diagonal,
                    enPassanNotation,
                    activePlayer
                )
            ) {
                pawnMoves = [...pawnMoves, ...diagonal];
            }
        });
    }

    pawnMoves = omitKingExposingThreats(
        file,
        rank,
        pawnMoves,
        boardPositions,
        activePlayer
    );

    return pawnMoves;
};

export const getIsPawnDefendingSquare = ({
    defendingPlayer,
    boardPositions,
    square,
}: {
    defendingPlayer: "white" | "black";
    boardPositions: BoardPositionHash;
    square: string;
}): boolean => {
    const [fileStr, rankStr] = square.split("");
    const fileIndex = Files[fileStr as FileType];
    const rank = parseInt(rankStr);
    let eastPosition = null;
    let westPosition = null;

    if (defendingPlayer === "white") {
        eastPosition = boardPositions[`${Files[fileIndex + 1]}${rank - 1}`];
        westPosition = boardPositions[`${Files[fileIndex - 1]}${rank - 1}`];
    } else {
        eastPosition = boardPositions[`${Files[fileIndex + 1]}${rank + 1}`];
        westPosition = boardPositions[`${Files[fileIndex - 1]}${rank + 1}`];
    }

    return (
        (eastPosition?.color === defendingPlayer &&
            eastPosition?.code === "P") ||
        (westPosition?.color === defendingPlayer && westPosition?.code === "P")
    );
};

export const getPawnThreats = ({
    activePlayer,
    targetSquare,
}: {
    activePlayer: "white" | "black";
    targetSquare: string;
}): string[] => {
    const [pawnFileStr, pawnRankStr] = targetSquare.split("");
    const pawnFileIndex = Files[pawnFileStr as FileType];
    const rankIncrement = activePlayer === "white" ? -1 : 1;
    let attackSquares: string[] = [];

    if (pawnFileIndex > 0) {
        attackSquares.push(
            `${Files[pawnFileIndex - 1]}${
                parseInt(pawnRankStr) + rankIncrement
            }`
        );
    }

    if (pawnFileIndex < 7) {
        attackSquares.push(
            `${Files[pawnFileIndex + 1]}${
                parseInt(pawnRankStr) + rankIncrement
            }`
        );
    }
    return attackSquares;
};

const isPawnAbleToCapture = (
    boardPositions: BoardPositionHash,
    targetPositions: string[],
    enPassanNotation: EnPassan | null,
    activePlayer: string
): boolean => {
    const targetSquare = boardPositions[targetPositions[0]];
    return (
        (targetSquare && targetSquare.color !== activePlayer) ||
        enPassanNotation?.landingSquareNotation === targetPositions[0]
    );
};
