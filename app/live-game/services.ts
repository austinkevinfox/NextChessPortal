import { BoardPositionHash } from "../Interfaces";
import { getAlgebraicBishopMoves } from "./_components/AlgebraicPositionServices/AlgebraicBishopPositionServices";
import { getAlgebraicKnightMoves } from "./_components/AlgebraicPositionServices/AlgebraicKnightPositionServices";
import { getAlgebraicPawnMoves } from "./_components/AlgebraicPositionServices/AlgebraicPawnPositionServices";

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

    //      if (pieceToMove === "rook") {
    //          targetAlgebraicNotations = getAlgebraicRookMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //      }

    //      if (pieceToMove === "queen") {
    //          targetAlgebraicNotations = getAlgebraicQueenMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //      }

    //      if (pieceToMove === "king") {
    //          const isKingSideCastleAvailable =
    //              activePlayer === "white"
    //                  ? isWhiteKingSideCastleAvailable
    //                  : isBlackKingSideCastleAvailable;
    //          const isQueenSideCastleAvailable =
    //              activePlayer === "white"
    //                  ? isWhiteQueenSideCastleAvailable
    //                  : isBlackQueenSideCastleAvailable;
    //          targetAlgebraicNotations = getAlgebraicKingMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer,
    //              isKingSideCastleAvailable,
    //              isQueenSideCastleAvailable
    //          );
    //      }

    //      possibleMoves = targetAlgebraicNotations.map(
    //          (notation) =>
    //              tmpPositions.findIndex(
    //                  (position) => position.algebraicNotation === notation
    //              ) + 1
    //      );

    return possibleMoves;
};
