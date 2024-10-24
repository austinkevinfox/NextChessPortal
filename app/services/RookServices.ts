import { Files, FileType } from "../components/PositionConstants";
import { GameState, Piece } from "../Interfaces";
import { getSourcesByPiece } from "./PieceServices";

export const getRookSource = ({
    file,
    rank,
    sourceHint,
    gameState,
}: {
    file: string;
    rank: string;
    sourceHint: string;
    gameState: GameState;
}): string => {
    const sources = getSourcesByPiece({ gameState, pieceCode: "R" });

    if (sources.length === 1) {
        return sources[0];
    }

    if (sources.length > 1 && sourceHint.length === 1) {
        let foundSource = "";
        let j = 0;
        const pattern = isNaN(Number(sourceHint))
            ? new RegExp("^" + sourceHint)
            : new RegExp(sourceHint + "$");

        while (foundSource === "" && j < sources.length) {
            if (sources[j].search(pattern) >= 0) {
                foundSource = sources[j];
            } else {
                j++;
            }
        }

        return foundSource;
    }

    if (sources.length > 1 && sourceHint.length === 0) {
        return getRookSourceByTraversal({
            file,
            rank,
            gameState,
        });
    }

    return "";
};

const getRookSourceByTraversal = ({
    file,
    rank,
    gameState,
}: {
    file: string;
    rank: string;
    gameState: GameState;
}): string => {
    let rookSource: string | null = null;
    const fileIndex = Files[file as FileType];
    const rankNumber = parseInt(rank);

    for (const direction of ["north", "east", "south", "west"]) {
        rookSource = getRookSourceByDirection({
            direction,
            fileIndex,
            rankNumber,
            gameState,
        });
        if (rookSource) break;
    }

    return rookSource!;
};

const getRookSourceByDirection = ({
    direction,
    fileIndex,
    rankNumber,
    gameState,
}: {
    direction: string;
    fileIndex: number;
    rankNumber: number;
    gameState: GameState;
}): string => {
    let source: string = "";
    let piece: Piece | null;
    let fileIncrement = 0;
    let rankIncrement = 0;

    switch (direction) {
        case "north":
            rankIncrement = 1;
            break;

        case "east":
            fileIncrement = 1;
            break;

        case "south":
            rankIncrement = -1;
            break;

        case "west":
            fileIncrement = -1;
            break;
    }

    let nextFileIndex = fileIndex + fileIncrement;
    let nextRank = rankNumber + rankIncrement;

    while (
        nextFileIndex >= 0 &&
        nextFileIndex < 8 &&
        nextRank > 0 &&
        nextRank <= 8 &&
        source === ""
    ) {
        const notation = `${Files[nextFileIndex]}${nextRank}`;
        piece = gameState.boardPositions[notation];

        if (piece?.code === "R" && piece?.color === gameState.activePlayer) {
            source = notation;
        } else {
            nextFileIndex += fileIncrement;
            nextRank += rankIncrement;
        }
    }
    return source;
};
