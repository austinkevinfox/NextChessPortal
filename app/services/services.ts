import { BoardPositionHash, GameState, Piece } from "@/app/Interfaces";
import {
    getAnnotatedMove,
    getSourceNotation,
} from "@/app/services/MoveServices";
import { initialPositions } from "@/app/components/PositionConstants";

export const loadGame = (gameString: string | null): string[] => {
    const loadedGame = gameString || "1. e4 c5";
    let tmpLoadedGameMoves: string[] = [];
    const savedGame = loadedGame
        .split(/\s*\d+\s*\.\s*/)
        .filter((item) => item !== "");

    savedGame.forEach((gameStep) => {
        const tmpArr = gameStep.split(" ");
        tmpLoadedGameMoves = [...tmpLoadedGameMoves, ...tmpArr];
    });

    return tmpLoadedGameMoves;
};

export const getNextBoardPositions = (
    gameState: GameState,
    rawMove: string
): BoardPositionHash => {
    const annotatedMove = getAnnotatedMove(rawMove);
    let nextMove = annotatedMove.base;
    const isCapture = /x/.test(nextMove);
    const tmpPositions = { ...gameState.boardPositions };

    let sourceNotation = "";
    let targetNotation: string = "";
    let sourceHint: string = "";

    if (/^[O0]-[O0]$/.test(nextMove)) {
        // Castle King-side
        if (gameState.activePlayer === "white") {
            const kingPiece: Piece = tmpPositions["e1"]!;
            const rookPiece: Piece = tmpPositions["h1"]!;
            tmpPositions["g1"] = kingPiece;
            tmpPositions["f1"] = rookPiece;
            tmpPositions["e1"] = null;
            tmpPositions["h1"] = null;
        } else {
            const kingPiece: Piece = tmpPositions["e8"]!;
            const rookPiece: Piece = tmpPositions["h8"]!;
            tmpPositions["g8"] = kingPiece;
            tmpPositions["f8"] = rookPiece;
            tmpPositions["e8"] = null;
            tmpPositions["h8"] = null;
        }
    } else if (/^[O0]-[O0]-[O0]$/.test(nextMove)) {
        // Castle Queen-side
        const kingPiece: Piece = tmpPositions["e1"]!;
        const rookPiece: Piece = tmpPositions["a1"]!;
        tmpPositions["c1"] = kingPiece;
        tmpPositions["d1"] = rookPiece;
        tmpPositions["e1"] = null;
        tmpPositions["a1"] = null;
    } else {
        targetNotation = nextMove.slice(-2);

        sourceNotation = getSourceNotation({
            gameState,
            nextMove,
            isCapture,
            sourceHint,
        });
        const movingPiece: Piece = gameState.boardPositions[sourceNotation]!;

        tmpPositions[sourceNotation!] = null;
        tmpPositions[targetNotation] = movingPiece!;
    }

    return tmpPositions;
};

export const getGameBoardPositions = (
    loadedGame: string[]
): BoardPositionHash[] => {
    const gameBoardPositions: BoardPositionHash[] = [{ ...initialPositions }];

    for (let index = 0; index < loadedGame.length; index++) {
        let nextBoardPosition = getNextBoardPositions(
            {
                activePlayer:
                    index === 0 || index % 2 === 0 ? "white" : "black",
                boardPositions: gameBoardPositions[index],
            },
            loadedGame[index]
        );
        gameBoardPositions.push(nextBoardPosition);
    }

    return gameBoardPositions;
};
