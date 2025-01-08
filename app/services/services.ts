import {
    initialPositions,
    initialCapturedPieces,
} from "@/app/components/PositionConstants";
import {
    AnnotatedMove,
    BoardPositionHash,
    CapturedPieces,
    GameState,
    Piece,
    StepData,
} from "@/app/Interfaces";
import {
    BlackBishop,
    BlackKnight,
    BlackQueen,
    BlackRook,
    WhiteBishop,
    WhiteKnight,
    WhiteQueen,
    WhiteRook,
} from "@/app/public/svg-no-shadow";
import {
    getAnnotatedMove,
    getSourceNotation,
} from "@/app/services/MoveServices";
import cloneDeep from "lodash.clonedeep";

const PromotionPieceMap = {
    whiteQ: { name: "queen", component: WhiteQueen },
    blackQ: { name: "queen", component: BlackQueen },
    whiteR: { name: "rook", component: WhiteRook },
    blackR: { name: "rook", component: BlackRook },
    whiteB: { name: "bishop", component: WhiteBishop },
    blackB: { name: "bishop", component: BlackBishop },
    whiteN: { name: "knight", component: WhiteKnight },
    blackN: { name: "knight", component: BlackKnight },
};
declare type PromotionPieceType = keyof typeof PromotionPieceMap;

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

    /* If game result annotation is included in the list of moves, remove it.
     * TODO: validate correct data at creation time.
     */
    if (/^\d-\d$/.test(arrayOfMoves.slice(-1)[0])) {
        return arrayOfMoves.slice(0, -1);
    }

    return arrayOfMoves;
};

const isUpperCase = (str: string): boolean => {
    return str.toUpperCase() == str;
};

const getCapturedPieces = (
    gameState: GameState,
    annotatedMove: AnnotatedMove,
    capturedPieces: CapturedPieces
): CapturedPieces => {
    const tmpCapturedPieces = cloneDeep(capturedPieces);
    const nextMove = annotatedMove.base;
    const isCapture = /x/.test(nextMove);
    const tmpPositions = { ...gameState.boardPositions };

    if (isCapture) {
        const matches = getMatchesOnCapture(nextMove);
        if (matches) {
            const capturedPiece = tmpPositions[matches[2]]!;
            tmpCapturedPieces[capturedPiece.color][capturedPiece.name].push(
                capturedPiece
            );
        }
    }

    return tmpCapturedPieces;
};

const getMatchesOnCapture = (move: string): string[] | null =>
    /^(\w{1,2})x(\w{2,})$/.exec(move);

const getPromotionPiece = (
    color: "white" | "black",
    code: "Q" | "R" | "B" | "N" | ""
): Piece => {
    const key = `${color}${code}`;
    const piece = PromotionPieceMap[key as PromotionPieceType];
    return {
        color,
        code: code as "Q" | "R" | "B" | "N",
        name: piece.name as "queen" | "rook" | "bishop" | "knight",
        component: piece.component,
    };
};

export const getNextBoardPositions = (
    gameState: GameState,
    annotatedMove: AnnotatedMove,
    focusPositions: string[]
): BoardPositionHash => {
    const nextMove = annotatedMove.base;
    const tmpPositions = { ...gameState.boardPositions };
    const castleRank = gameState.activePlayer === "white" ? 1 : 8;

    if (/^0-0$/.test(nextMove)) {
        // Castle King-side
        const kingPiece: Piece = tmpPositions[`e${castleRank}`]!;
        const rookPiece: Piece = tmpPositions[`h${castleRank}`]!;
        tmpPositions[`g${castleRank}`] = kingPiece;
        tmpPositions[`f${castleRank}`] = rookPiece;
        tmpPositions[`e${castleRank}`] = null;
        tmpPositions[`h${castleRank}`] = null;
    } else if (/^0-0-0$/.test(nextMove)) {
        // Castle Queen-side
        const kingPiece: Piece = tmpPositions[`e${castleRank}`]!;
        const rookPiece: Piece = tmpPositions[`a${castleRank}`]!;
        tmpPositions[`c${castleRank}`] = kingPiece;
        tmpPositions[`d${castleRank}`] = rookPiece;
        tmpPositions[`e${castleRank}`] = null;
        tmpPositions[`a${castleRank}`] = null;
    } else {
        const sourceNotation = focusPositions[0];
        const targetNotation = focusPositions[1];

        const subjectPiece: Piece =
            annotatedMove.promotion && annotatedMove.promotion.length > 0
                ? getPromotionPiece(
                      gameState.activePlayer as "white" | "black",
                      annotatedMove.promotion
                  )
                : gameState.boardPositions[sourceNotation]!;

        tmpPositions[sourceNotation!] = null;
        tmpPositions[targetNotation] = subjectPiece!;
    }

    return tmpPositions;
};

const getFocusNotations = (
    gameState: GameState,
    annotatedMove: AnnotatedMove
): string[] => {
    let nextMove = annotatedMove.base;
    const isCapture = /x/.test(nextMove);
    const castleRank = gameState.activePlayer === "white" ? 1 : 8;
    let sourceNotation = "";
    let targetNotation: string = "";
    let sourceHint: string = "";

    if (/^0-0$/.test(nextMove)) {
        // Castle King-side
        sourceNotation = `e${castleRank}`;
        targetNotation = `g${castleRank}`;
    } else if (/^0-0-0$/.test(nextMove)) {
        // Castle Queen-side
        sourceNotation = `e${castleRank}`;
        targetNotation = `c${castleRank}`;
    } else {
        if (isCapture) {
            const matches = getMatchesOnCapture(nextMove);
            if (matches) {
                if (isUpperCase(matches[1])) {
                    nextMove = `${matches[1]}${matches[2]}`;
                } else {
                    sourceHint = matches[1];
                    nextMove = matches[2];
                }
            }
        }

        sourceNotation = getSourceNotation({
            gameState,
            nextMove,
            isCapture,
            sourceHint,
        });
        targetNotation = nextMove.slice(-2);
    }
    return [sourceNotation, targetNotation];
};

export const getStepData = (moves: string[]): StepData[] => {
    const movesAnnotated = moves.map((rawMove) => getAnnotatedMove(rawMove));
    const stepDataArray: StepData[] = [
        {
            boardPositions: initialPositions,
            focusPositions: [],
            capturedPieces: initialCapturedPieces,
        },
    ];

    movesAnnotated.forEach((annotatedMove, index) => {
        const gameState = {
            activePlayer: index === 0 || index % 2 === 0 ? "white" : "black",
            boardPositions: stepDataArray[index].boardPositions,
        };

        const nextFocusPositions = getFocusNotations(gameState, annotatedMove);

        const nextCapturedPieces = getCapturedPieces(
            gameState,
            annotatedMove,
            stepDataArray[index].capturedPieces
        );

        const nextBoardPositions = getNextBoardPositions(
            gameState,
            annotatedMove,
            nextFocusPositions
        );

        stepDataArray.push({
            boardPositions: nextBoardPositions,
            focusPositions: nextFocusPositions,
            capturedPieces: nextCapturedPieces,
        });
    });

    return stepDataArray;
};
