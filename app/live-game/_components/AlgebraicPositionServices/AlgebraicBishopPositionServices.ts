import { BoardPosition } from "../Interfaces";
import {
    getNorthEastDiagonal,
    getNorthWestDiagonal,
    getSouthEastDiagonal,
    getSouthWestDiagonal,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";

export const getAlgebraicBishopMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
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

    bishopMoves = omitKingExposingThreats(
        file,
        rank,
        bishopMoves,
        boardPositions,
        activePlayer
    );

    return bishopMoves;
};

export const getBishopThreats = (
    kingSquareNotation: string,
    positions: BoardPosition[],
    activePlayer: string
): string[] => {
    let bishopThreats: string[] = [];
    const tmpPositions = [...positions];
    const [file, rank] = kingSquareNotation.split("");
    const algebraicBishopNotations = getAlgebraicBishopMoves(
        file,
        rank,
        positions,
        activePlayer
    );
    algebraicBishopNotations.forEach((notation) => {
        const bishopPosition = tmpPositions.find(
            (position) =>
                position.algebraicNotation === notation &&
                position.piece?.name === "bishop" &&
                position.piece?.color !== activePlayer
        );
        if (bishopPosition) {
            bishopThreats.push(bishopPosition.algebraicNotation);
        }
    });

    return bishopThreats;
};
