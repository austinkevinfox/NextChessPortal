// import { BoardPosition, Piece, EnPassan } from "../Interfaces";
import { BoardPositionHash, EnPassan } from "@/app/Interfaces";
import {
    getNorthFile1Space,
    getSouthFile1Space,
    getNorthEastDiagonal1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthWestDiagonal1Space,
    omitKingExposingThreats,
    // omitKingExposingThreats,
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

// interface EnPassanNotationProps {
//     positions: BoardPosition[];
//     squareIndex: number;
//     source: number;
//     target: number;
//     activePlayer: string;
// }

// export const getEnPassanNotation = ({
//     positions,
//     squareIndex,
//     source,
//     target,
//     activePlayer,
// }: EnPassanNotationProps): EnPassan | null => {
//     const tmpPositions = [...positions];
//     const tmpPiece = tmpPositions[squareIndex].piece!;
//     if (isPawnMove2SquareOpening(tmpPiece, source, target)) {
//         const indices = [1, 2].map((j) =>
//             activePlayer === "white" ? squareIndex - 8 * j : squareIndex + 8 * j
//         );
//         const enPassonObject: EnPassan = {
//             captureSquareNotation: tmpPositions[indices[1]].algebraicNotation,
//             landingSquareNotation: tmpPositions[indices[0]].algebraicNotation,
//         };
//         return enPassonObject;
//     } else {
//         return null;
//     }
// };

// const isPawnMove2SquareOpening = (
//     piece: Piece,
//     source: number,
//     target: number
// ): boolean => piece.name === "pawn" && Math.abs(source + 1 - target) === 16;

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
