import { GameState, Piece } from "../Interfaces";
import { Files } from "../components/PositionConstants";

export const getImageSource = (piece: Piece | null): string => {
    if (piece) {
        const colorInitial: string = piece.color.substring(0, 1);
        return `/public/svg-no-shadow/${colorInitial}_${piece.name}_svg_NoShadow.svg`;
    }
    return "";
};

export const getFileRankFromIndices = (fileIndex: number, rankIndex: number) =>
    `${Files[fileIndex]}${rankIndex}`;

export const getSourcesByPiece = ({
    gameState,
    pieceCode,
}: {
    gameState: GameState;
    pieceCode: string;
}): string[] => {
    const sources: string[] = [];

    for (const [notation, piece] of Object.entries(gameState.boardPositions)) {
        if (
            piece?.code === pieceCode &&
            piece?.color === gameState.activePlayer
        ) {
            sources.push(notation);
        }
    }

    return sources;
};

export const getSolePieceSource = ({
    gameState,
    pieceCode,
}: {
    gameState: GameState;
    pieceCode: string;
}): string => {
    let pieceSource: string | null = null;

    for (const [notation, piece] of Object.entries(gameState.boardPositions)) {
        if (
            piece?.code === pieceCode &&
            piece?.color === gameState.activePlayer
        ) {
            pieceSource = notation;
            break;
        }
    }

    return pieceSource!;
};
