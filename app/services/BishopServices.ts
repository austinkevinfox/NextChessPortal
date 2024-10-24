import { Files, FileType } from "../components/PositionConstants";
import { GameState, Piece } from "../Interfaces";

export const getBishopSource = ({
    file,
    rank,
    gameState,
}: {
    file: string;
    rank: string;
    gameState: GameState;
}): string => {
    let bishopSource: string | null = null;
    const fileIndex = Files[file as FileType];
    const rankNumber = parseInt(rank);

    for (const direction of [
        "northeast",
        "southeast",
        "southwest",
        "northwest",
    ]) {
        bishopSource = getBishopSourceByDirection({
            direction,
            fileIndex,
            rankNumber,
            gameState,
        });
        if (bishopSource) break;
    }

    return bishopSource!;
};

const getBishopSourceByDirection = ({
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
        case "northeast":
            fileIncrement = 1;
            rankIncrement = 1;
            break;

        case "southeast":
            fileIncrement = 1;
            rankIncrement = -1;
            break;

        case "southwest":
            fileIncrement = -1;
            rankIncrement = -1;
            break;

        case "northwest":
            fileIncrement = -1;
            rankIncrement = 1;
            break;

        default:
            fileIncrement = 0;
            rankIncrement = 0;
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

        if (piece?.code === "B" && piece?.color === gameState.activePlayer) {
            source = notation;
        } else {
            nextFileIndex += fileIncrement;
            nextRank += rankIncrement;
        }
    }

    return source;
};
