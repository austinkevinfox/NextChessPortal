import {
    AnnotatedMove,
    BoardPositionHash,
    GameState,
    GameTableStore,
    Piece,
} from "@/app/Interfaces";
import {
    getAnnotatedMove,
    getSourceNotation,
} from "@/app/services/MoveServices";
import { initialPositions } from "@/app/components/PositionConstants";

export const getArrayOfMoves = (gameString: string | null): string[] => {
    if (!gameString) return [];

    let arrayOfMoves: string[] = [];

    // strip move numbers and return array of moves, white and black
    const filteredMoves = gameString
        .split(/\s*\d+\s*\.\s*/)
        .filter((item) => item !== "");

    filteredMoves.forEach((item) => {
        const tmpArr = item.split(" ");
        arrayOfMoves = [...arrayOfMoves, ...tmpArr];
    });

    return arrayOfMoves;
};

const isUpperCase = (str: string): boolean => {
    return str.toUpperCase() == str;
};

export const getNextBoardPositions = (
    gameState: GameState,
    annotatedMove: AnnotatedMove
): BoardPositionHash => {
    // const annotatedMove = getAnnotatedMove(rawMove);
    let nextMove = annotatedMove.base;
    const isCapture = /x/.test(nextMove);
    const tmpPositions = { ...gameState.boardPositions };

    let sourceNotation = "";
    let targetNotation: string = "";
    let sourceHint: string = "";

    if (isCapture) {
        const matches = /^(\w{1,2})x(\w{2,})$/.exec(nextMove);
        if (matches) {
            if (isUpperCase(matches[1])) {
                nextMove = `${matches[1]}${matches[2]}`;
            } else {
                sourceHint = matches[1];
                nextMove = matches[2];
            }
            // const capturedPiece = tmpPositions[matches[2]]!;
            // const tmpCapturedPieces = { ...capturedPieces };
            // tmpCapturedPieces[capturedPiece.color].push(capturedPiece!);
            // setCapturedPieces(tmpCapturedPieces);
        }
    }

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

export const getGameBoardPositions = (moves: string[]): BoardPositionHash[] => {
    const gameBoardPositions: BoardPositionHash[] = [{ ...initialPositions }];
    const movesAnnotated = moves.map((rawMove) => getAnnotatedMove(rawMove));

    movesAnnotated.forEach((annotatedMove, index) => {
        let nextBoardPosition = getNextBoardPositions(
            {
                activePlayer:
                    index === 0 || index % 2 === 0 ? "white" : "black",
                boardPositions: gameBoardPositions[index],
            },
            annotatedMove
        );
        gameBoardPositions.push(nextBoardPosition);
    });

    return gameBoardPositions;
};
