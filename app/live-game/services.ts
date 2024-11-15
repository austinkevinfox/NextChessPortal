import { BoardPositionHash } from "../Interfaces";
import { getAlgebraicBishopMoves } from "./_components/AlgebraicPositionServices/AlgebraicBishopPositionServices";
import { getAlgebraicKingMoves } from "./_components/AlgebraicPositionServices/AlgebraicKingPositionServices";
import { getAlgebraicKnightMoves } from "./_components/AlgebraicPositionServices/AlgebraicKnightPositionServices";
import { getAlgebraicPawnMoves } from "./_components/AlgebraicPositionServices/AlgebraicPawnPositionServices";
import { getAlgebraicQueenMoves } from "./_components/AlgebraicPositionServices/AlgebraicQueenPositionServices";
import { getAlgebraicRookMoves } from "./_components/AlgebraicPositionServices/AlgebraicRookPositionServices";

interface GetMovesByPieceArgs {
    positions: BoardPositionHash;
    activePlayer: "white" | "black";
    pieceToMove: string;
    file: string;
    rank: number;
}

export const getMovesByPiece = ({
    positions,
    activePlayer,
    pieceToMove,
    file,
    rank,
}: GetMovesByPieceArgs): string[] => {
    let possibleMoves: string[] = [];
    const tmpPositions = { ...positions };

    if (pieceToMove === "pawn") {
        const enPassanNotation = null;

        possibleMoves = getAlgebraicPawnMoves(
            file,
            rank,
            tmpPositions,
            enPassanNotation,
            activePlayer
        );
    }

    if (pieceToMove === "knight") {
        possibleMoves = getAlgebraicKnightMoves(
            file,
            rank,
            tmpPositions,
            activePlayer
        );
        //  possibleMoves = possibleMoves.filter((notation) => {
        //      let position = tmpPositions.find(
        //          (item) => item.algebraicNotation === notation
        //      );
        //      return (
        //          position?.piece === null ||
        //          position?.piece.color !== activePlayer
        //      );
        //  });
    }

    if (pieceToMove === "bishop") {
        possibleMoves = getAlgebraicBishopMoves(
            file,
            rank,
            tmpPositions,
            activePlayer
        );
    }

    if (pieceToMove === "rook") {
        possibleMoves = getAlgebraicRookMoves(
            file,
            rank,
            tmpPositions,
            activePlayer
        );
    }

    if (pieceToMove === "queen") {
        possibleMoves = getAlgebraicQueenMoves(
            file,
            rank,
            tmpPositions,
            activePlayer
        );
    }

    if (pieceToMove === "king") {
        possibleMoves = getAlgebraicKingMoves(
            file,
            rank,
            tmpPositions,
            activePlayer,
            false,
            false
        );
    }

    return possibleMoves;
};
