import { BoardPositionHash, Castling, CheckNotice } from "../Interfaces";
import { getAlgebraicBishopMoves } from "./_components/AlgebraicPositionServices/AlgebraicBishopPositionServices";
import {
    getKingMoveSquares
} from "./_components/AlgebraicPositionServices/AlgebraicKingPositionServices";
import { getAlgebraicKnightMoves } from "./_components/AlgebraicPositionServices/AlgebraicKnightPositionServices";
import { getAlgebraicPawnMoves } from "./_components/AlgebraicPositionServices/AlgebraicPawnPositionServices";
import { getKingThreats } from "./_components/AlgebraicPositionServices/AlgebraicPositionServices";
import { getAlgebraicQueenMoves } from "./_components/AlgebraicPositionServices/AlgebraicQueenPositionServices";
import { getAlgebraicRookMoves } from "./_components/AlgebraicPositionServices/AlgebraicRookPositionServices";
import {
    isCastlingPathOpen,
    isCastlingPathSafe,
} from "./_components/AlgebraicPositionServices/CastlingServices";

interface GetMovesByPieceArgs {
    positions: BoardPositionHash;
    activePlayer: "white" | "black";
    pieceToMove: string;
    castling: Castling;
    file: string;
    rank: number;
}

export const getChecks = ({
    positions,
    activePlayer,
    targetSquare,
}: {
    positions: BoardPositionHash;
    activePlayer: "white" | "black";
    targetSquare: string;
}): CheckNotice | null => {
    const nextPlayer = activePlayer === "white" ? "black" : "white";
    const checkNotice = getKingThreats(positions, nextPlayer, targetSquare);

    return checkNotice;
};

export const getMovesByPiece = ({
    positions,
    activePlayer,
    pieceToMove,
    castling,
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
        possibleMoves = getKingMoveSquares({
            file,
            rank,
            boardPositions: tmpPositions,
            activePlayer,
        });
        const isKingSideCastleAvailable =
            castling[activePlayer].kingSide &&
            isCastlingPathOpen({
                boardPositions: tmpPositions,
                activePlayer,
                side: "kingSide",
            }) &&
            isCastlingPathSafe({
                boardPositions: tmpPositions,
                activePlayer,
                side: "kingSide",
            });
        if (isKingSideCastleAvailable) {
            possibleMoves.push(activePlayer === "white" ? "g1" : "g8");
        }
        const isQueenSideCastleAvailable =
            castling[activePlayer].queenSide &&
            isCastlingPathOpen({
                boardPositions: tmpPositions,
                activePlayer,
                side: "queenSide",
            }) &&
            isCastlingPathSafe({
                boardPositions: tmpPositions,
                activePlayer,
                side: "kingSide",
            });
            if (isQueenSideCastleAvailable) {
                possibleMoves.push(activePlayer === "white" ? "c1" : "c8");
            }
        
    }

    return possibleMoves;
};
