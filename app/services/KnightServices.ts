import { Files, FileType } from "../components/PositionConstants";
import { GameState, Piece } from "../Interfaces";

export const getKnightSource = ({
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
    const possibleKnightSources = getKnightSources({
        file,
        rank,
        gameState,
    });
    let sourceNotation: string = "";

    if (sourceHint.length > 0 && possibleKnightSources.length > 1) {
        const hintIndex = isNaN(Number(sourceHint)) ? 0 : 1;
        sourceNotation = possibleKnightSources.filter(
            (notation) => notation.charAt(hintIndex) === sourceHint
        )[0];
    } else {
        sourceNotation = possibleKnightSources[0];
    }

    return sourceNotation;
};

const getKnightSources = ({
    file,
    rank,
    gameState,
}: {
    file: string;
    rank: string;
    gameState: GameState;
}): string[] => {
    const knightMoves: string[] = [];
    const fileIndex = Files[file as FileType];
    const rankNumber = parseInt(rank);

    [-2, -1, 1, 2].forEach((i) => {
        const fileString: string | undefined = Files[fileIndex + i];

        if (fileString) {
            if (i === -2 || i === 2) {
                [-1, 1].forEach((step) => {
                    const notation = `${fileString}${rankNumber + step}`;
                    if (
                        isKnightPosition({
                            activePlayer: gameState.activePlayer,
                            rank: rankNumber,
                            piece: gameState.boardPositions[notation],
                        })
                    ) {
                        knightMoves.push(notation);
                    }
                });
            } else {
                [-2, 2].forEach((step) => {
                    const notation = `${fileString}${rankNumber + step}`;
                    if (
                        isKnightPosition({
                            activePlayer: gameState.activePlayer,
                            rank: rankNumber,
                            piece: gameState.boardPositions[notation],
                        })
                    ) {
                        knightMoves.push(notation);
                    }
                });
            }
        }
    });

    return knightMoves;
};

const isKnightPosition = ({
    activePlayer,
    rank,
    piece,
}: {
    activePlayer: string;
    rank: number;
    piece: Piece | null;
}): boolean =>
    rank >= 1 &&
    rank <= 8 &&
    piece?.color === activePlayer &&
    piece?.code === "N";
