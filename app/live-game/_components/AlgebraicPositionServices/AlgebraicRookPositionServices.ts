import { BoardPosition } from "../Interfaces";
import {
    getNorthFile,
    getEastRank,
    getSouthFile,
    getWestRank,
    omitKingExposingThreats,
} from "./AlgebraicPositionServices";

export const getAlgebraicRookMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
    const northFile = getNorthFile(file + rank, boardPositions, activePlayer);
    const eastRank = getEastRank(file + rank, boardPositions, activePlayer);
    const southFile = getSouthFile(file + rank, boardPositions, activePlayer);
    const westRank = getWestRank(file + rank, boardPositions, activePlayer);

    let rookMoves = [...northFile, ...eastRank, ...southFile, ...westRank];

    rookMoves = omitKingExposingThreats(
        file,
        rank,
        rookMoves,
        boardPositions,
        activePlayer
    );

    return rookMoves;
};

export const getRookThreats = (
    kingSquareNotation: string,
    positions: BoardPosition[],
    activePlayer: string
): string[] => {
    let rookThreats: string[] = [];
    const tmpPositions = [...positions];
    const [file, rank] = kingSquareNotation.split("");
    const algebraicRookNotations = getAlgebraicRookMoves(
        file,
        rank,
        positions,
        activePlayer
    );
    algebraicRookNotations.forEach((notation) => {
        const rookPosition = tmpPositions.find(
            (position) =>
                position.algebraicNotation === notation &&
                position.piece?.name === "rook" &&
                position.piece?.color !== activePlayer
        );
        if (rookPosition) {
            rookThreats.push(rookPosition.algebraicNotation);
        }
    });

    return rookThreats;
};
