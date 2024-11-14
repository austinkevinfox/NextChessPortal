import { BoardPositionHash } from "../Interfaces";
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

    //      if (pieceToMove === "knight") {
    //          targetAlgebraicNotations = getAlgebraicKnightMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //          targetAlgebraicNotations = targetAlgebraicNotations.filter(
    //              (notation) => {
    //                  let position = tmpPositions.find(
    //                      (item) => item.algebraicNotation === notation
    //                  );
    //                  return (
    //                      position?.piece === null ||
    //                      position?.piece.color !== activePlayer
    //                  );
    //              }
    //          );
    //      }

    //      if (pieceToMove === "bishop") {
    //          targetAlgebraicNotations = getAlgebraicBishopMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //      }

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
