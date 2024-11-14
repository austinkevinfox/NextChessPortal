import { BoardPositionHash } from "../Interfaces";

interface GetMovesByPieceArgs {
    positions: BoardPositionHash;
    pieceToMove: string;
    file: string;
    rank: string;
}

export const getMovesByPiece = (): string[] => {
    let possibleMoves: string[] = ["e3", "e4"];
    //  const tmpPositions = [...positions];
    //      let targetAlgebraicNotations: string[] = [];

    //      if (pieceToMove === "pawn") {
    //          targetAlgebraicNotations = getAlgebraicPawnMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              enPassanNotation,
    //              activePlayer
    //          );
    //      }

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
