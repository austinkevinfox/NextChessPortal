import { BoardPositionHash } from "@/app/Interfaces";
import { getAlgebraicBishopMoves } from "./AlgebraicBishopPositionServices";
import { getAlgebraicQueenMoves } from "./AlgebraicQueenPositionServices";
import { getAlgebraicRookMoves } from "./AlgebraicRookPositionServices";

declare type AttackerPositions = {
    bishop: string[];
    rook: string[];
    queen: string[];
};

declare type AttackerType = keyof AttackerPositions;

const CastlingPathSquares = {
    kingSide: ["f", "g"],
    queenSide: ["b", "c", "d"],
};

const CastlingFullPathSquares = {
    kingSide: ["e", "f", "g", "h"],
    queenSide: ["a", "b", "c", "d", "e"],
};
const ShortThreatFiles = {
    kingSide: ["d", "e", "f", "g", "h"],
    queenSide: ["a", "b", "c", "d", "e", "f"],
};

interface CastlingPathArgs {
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
    side: "kingSide" | "queenSide";
}

export const isCastlingPathOpen = ({
    boardPositions,
    activePlayer,
    side,
}: CastlingPathArgs): boolean => {
    const rank = activePlayer === "white" ? 1 : 8;
    let isPathOpen = false;

    CastlingPathSquares[side].every((fileChar) => {
        isPathOpen = boardPositions[`${fileChar}${rank}`] === null;
        return isPathOpen;
    });

    return isPathOpen;
};

export const isCastlingPathSafe = ({
    boardPositions,
    activePlayer,
    side,
}: CastlingPathArgs): boolean => {
    let isPathSafe = false;

    isPathSafe =
        !isCastlingPathThreatenedByPawn({
            boardPositions,
            activePlayer,
            side,
        }) &&
        !isCastlingPathThreatenedByKnight({
            boardPositions,
            activePlayer,
            side,
        }) &&
        !isCastlingPathThreatenedByLongRangePiece({
            boardPositions,
            activePlayer,
            side,
        });

    return isPathSafe;
};

const isCastlingPathThreatenedByPawn = ({
    boardPositions,
    activePlayer,
    side,
}: CastlingPathArgs): boolean => {
    const rank = activePlayer === "white" ? 2 : 7;
    let isPawnThreat = false;

    ShortThreatFiles[side].every((fileChar) => {
        const position = boardPositions[`${fileChar}${rank}`];
        isPawnThreat =
            position?.code === "P" && position?.color !== activePlayer;

        return !isPawnThreat;
    });
    return isPawnThreat;
};

const isCastlingPathThreatenedByKnight = ({
    boardPositions,
    activePlayer,
    side,
}: CastlingPathArgs): boolean => {
    const ranks = activePlayer === "white" ? [2, 3] : [6, 7];
    let isRankSafe = true;
    let isKnightThreat = false;

    ranks.every((rank) => {
        isRankSafe = ShortThreatFiles[side].every((fileChar) => {
            const position = boardPositions[`${fileChar}${rank}`];
            isKnightThreat =
                position?.code === "N" && position?.color !== activePlayer;

            return !isKnightThreat;
        });

        return isRankSafe;
    });

    return isKnightThreat;
};

const isCastlingPathThreatenedByLongRangePiece = ({
    boardPositions,
    activePlayer,
    side,
}: CastlingPathArgs): boolean => {
    let isCastlingPathThreatened = false;
    const attackingPlayer = activePlayer === "white" ? "black" : "white";
    const castleRank = activePlayer === "white" ? 1 : 8;

    // Build Attacker Positions
    let attackerPositions: AttackerPositions = {
        bishop: [],
        rook: [],
        queen: [],
    };

    Object.keys(attackerPositions).forEach((key) => {
        attackerPositions[key as AttackerType] = Object.keys(
            boardPositions
        ).filter(
            (algebraic) =>
                boardPositions[algebraic]?.name === key &&
                boardPositions[algebraic]?.color !== activePlayer
        );
    });

    if (!isCastlingPathThreatened) {
        attackerPositions.bishop.every((position) => {
            const [fileStr, rankStr] = position.split("");
            const moves = getAlgebraicBishopMoves(
                fileStr,
                parseInt(rankStr),
                boardPositions,
                attackingPlayer
            );
            isCastlingPathThreatened =
                moves.length > 0 &&
                CastlingFullPathSquares[side].some((fileChar) =>
                    moves.includes(`${fileChar}${castleRank}`)
                );
            return !isCastlingPathThreatened;
        });
    }

    if (!isCastlingPathThreatened) {
        attackerPositions.rook.every((position) => {
            const [fileStr, rankStr] = position.split("");
            const moves = getAlgebraicRookMoves(
                fileStr,
                parseInt(rankStr),
                boardPositions,
                attackingPlayer
            );
            isCastlingPathThreatened =
                moves.length > 0 &&
                CastlingFullPathSquares[side].some((fileChar) =>
                    moves.includes(`${fileChar}${castleRank}`)
                );
            return !isCastlingPathThreatened;
        });
    }

    if (!isCastlingPathThreatened) {
        attackerPositions.queen.every((position) => {
            const [fileStr, rankStr] = position.split("");
            const moves = getAlgebraicQueenMoves(
                fileStr,
                parseInt(rankStr),
                boardPositions,
                attackingPlayer
            );
            isCastlingPathThreatened =
                moves.length > 0 &&
                CastlingFullPathSquares[side].some((fileChar) =>
                    moves.includes(`${fileChar}${castleRank}`)
                );
            return !isCastlingPathThreatened;
        });
    }

    return isCastlingPathThreatened;
};
