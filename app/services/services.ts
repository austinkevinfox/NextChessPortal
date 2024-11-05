import { initialPositions } from "@/app/components/PositionConstants";
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
    let nextMove = annotatedMove.base;
    const isCapture = /x/.test(nextMove);
    const tmpPositions = { ...gameState.boardPositions };

    if (isCapture) {
        const matches = getMatchesOnCapture(nextMove);
        if (matches) {
            const capturedPiece = tmpPositions[matches[2]]!;
            if (!capturedPiece) {
                debugger;
            }
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
    annotatedMove: AnnotatedMove
): BoardPositionHash => {
    let nextMove = annotatedMove.base;
    const isCapture = /x/.test(nextMove);
    const tmpPositions = { ...gameState.boardPositions };

    let sourceNotation = "";
    let targetNotation: string = "";
    let sourceHint: string = "";

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
    if (/^0-0$/.test(nextMove)) {
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
    } else if (/^0-0-0$/.test(nextMove)) {
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

export const getStepData = (moves: string[]): StepData[] => {
    const movesAnnotated = moves.map((rawMove) => getAnnotatedMove(rawMove));
    const initialCapturedPieces = {
        white: {
            pawn: [],
            knight: [],
            bishop: [],
            rook: [],
            queen: [],
            king: [],
        },
        black: {
            pawn: [],
            knight: [],
            bishop: [],
            rook: [],
            queen: [],
            king: [],
        },
    };
    const stepDataArray: StepData[] = [
        {
            boardPositions: initialPositions,
            capturedPieces: initialCapturedPieces,
        },
    ];

    movesAnnotated.forEach((annotatedMove, index) => {
        const gameState = {
            activePlayer: index === 0 || index % 2 === 0 ? "white" : "black",
            boardPositions: stepDataArray[index].boardPositions,
        };

        const nextCapturedPieces = getCapturedPieces(
            gameState,
            annotatedMove,
            stepDataArray[index].capturedPieces
        );

        const nextBoardPositions = getNextBoardPositions(
            gameState,
            annotatedMove
        );

        stepDataArray.push({
            boardPositions: nextBoardPositions,
            capturedPieces: nextCapturedPieces,
        });
    });

    return stepDataArray;
};
