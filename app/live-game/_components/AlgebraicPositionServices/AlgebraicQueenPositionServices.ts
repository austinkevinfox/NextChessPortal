import { BoardPosition } from "../Interfaces";
import {
    getNorthFile,
    getEastRank,
    getSouthFile,
    getWestRank,
    getNorthEastDiagonal,
    getNorthWestDiagonal,
    getSouthEastDiagonal,
    getSouthWestDiagonal,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";

export const getAlgebraicQueenMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
    const northFile = getNorthFile(file + rank, boardPositions, activePlayer);
    const eastRank = getEastRank(file + rank, boardPositions, activePlayer);
    const southFile = getSouthFile(file + rank, boardPositions, activePlayer);
    const westRank = getWestRank(file + rank, boardPositions, activePlayer);
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

    let queenMoves = [
        ...northFile,
        ...eastRank,
        ...southFile,
        ...westRank,
        ...northWestDiagonal,
        ...northEastDiagonal,
        ...southWestDiagonal,
        ...southEastDiagonal,
    ];

    queenMoves = omitKingExposingThreats(
        file,
        rank,
        queenMoves,
        boardPositions,
        activePlayer
    );

    return queenMoves;
};

export const getQueenThreats = (
    kingSquareNotation: string,
    positions: BoardPosition[],
    activePlayer: string
): string[] => {
    let queenThreats: string[] = [];
    const tmpPositions = [...positions];
    const [file, rank] = kingSquareNotation.split("");
    const algebraicQueenNotations = getAlgebraicQueenMoves(
        file,
        rank,
        positions,
        activePlayer
    );
    algebraicQueenNotations.forEach((notation) => {
        const queenPosition = tmpPositions.find(
            (position) =>
                position.algebraicNotation === notation &&
                position.piece?.name === "queen" &&
                position.piece?.color !== activePlayer
        );
        if (queenPosition) {
            queenThreats.push(queenPosition.algebraicNotation);
        }
    });

    return queenThreats;
};
