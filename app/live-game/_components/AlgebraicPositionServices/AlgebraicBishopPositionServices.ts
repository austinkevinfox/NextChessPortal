import { BoardPositionHash } from "@/app/Interfaces";
import {
    getNorthEastDiagonal,
    getNorthWestDiagonal,
    getOpposingPiecePositions,
    getSouthEastDiagonal,
    getSouthWestDiagonal,
    // omitKingExposingThreats,
} from "./AlgebraicPositionServices";

export const getAlgebraicBishopMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    activePlayer: string
): string[] => {
    const rank = rankNumber.toString();
    const northWestDiagonal = getNorthWestDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const northEastDiagonal = getNorthEastDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southWestDiagonal = getSouthWestDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southEastDiagonal = getSouthEastDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );

    let bishopMoves = [
        ...northWestDiagonal,
        ...northEastDiagonal,
        ...southWestDiagonal,
        ...southEastDiagonal,
    ];

    // bishopMoves = omitKingExposingThreats(
    //     file,
    //     rank,
    //     bishopMoves,
    //     boardPositions,
    //     activePlayer
    // );

    return bishopMoves;
};

export const getBishopThreats = (
    positions: BoardPositionHash,
    activePlayer: "white" | "black"
): string[] => {
    let bishopThreats: string[] = [];
    const opposingBishopPositions = getOpposingPiecePositions({
        boardPositions: positions,
        activePlayer,
        pieceName: "bishop",
    });

    opposingBishopPositions.forEach((bishopPosition) => {
        const [file, rank] = bishopPosition.split("");
        const bishopMoves = getAlgebraicBishopMoves(
            file,
            parseInt(rank),
            positions,
            activePlayer === "white" ? "black" : "white"
        );
        bishopThreats = [...bishopThreats, ...bishopMoves];
    });

    return bishopThreats;
};
