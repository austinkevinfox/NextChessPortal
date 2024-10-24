import { AnnotatedMove, GameState, Piece } from "../Interfaces";
import { getBishopSource } from "./BishopServices";
import { getKnightSource } from "./KnightServices";
import { getSolePieceSource } from "./PieceServices";
import { getRookSource } from "./RookServices";

export const getAnnotatedMove = (rawMove: string): AnnotatedMove => {
    const annotatedMove: AnnotatedMove = { base: "", annotation: "" };
    const matches = /^(\w)?(\w)?(x)?([a-z])([1-8])([+=?!]{0,2})$/.exec(rawMove);
    if (matches) {
        matches.forEach((item, idx) => {
            if (item && idx > 0 && idx < 6) {
                annotatedMove.base += item;
            }

            if (item && idx === 6) {
                annotatedMove.annotation = item;
            }
        });
    } else {
        annotatedMove.base = rawMove;
    }
    return annotatedMove;
};

export const getSourceNotation = ({
    gameState,
    nextMove,
    isCapture,
    sourceHint,
}: {
    gameState: GameState;
    nextMove: string;
    isCapture: boolean;
    sourceHint: string;
}): string => {
    let sourceNotation = "";
    const code = nextMove.substring(0, 1);
    const targetNotation = nextMove.slice(-2);

    if (targetNotation.length === 2) {
        // Pawn move
        const [file, rank] = targetNotation.split("");
        const sourceFile =
            isCapture && sourceHint.length === 1 ? sourceHint : file;
        const sourceRankIncrement = gameState.activePlayer === "white" ? -1 : 1;
        let sourceRank: number = parseInt(rank) + sourceRankIncrement;
        sourceNotation = `${sourceFile}${sourceRank}`;

        // Handle 2 square openings
        if (
            (gameState.activePlayer === "white" && rank === "4") ||
            (gameState.activePlayer === "black" && rank === "5")
        ) {
            let sourcePiece: Piece | null =
                gameState.boardPositions[sourceNotation];

            while (sourcePiece === null) {
                sourceRank += sourceRankIncrement;
                sourceNotation = `${file}${sourceRank}`;
                sourcePiece = gameState.boardPositions[sourceNotation];
            }
        }
    }

    if (code === "N") {
        // Knight move
        const [fileStr, rankStr] = targetNotation.split("");
        const sourceHint: string =
            nextMove.length === 4 ? nextMove.substring(2, 1) : "";

        sourceNotation = getKnightSource({
            file: fileStr,
            rank: rankStr,
            sourceHint,
            gameState,
        });
    }

    if (code === "B") {
        // Bishop move
        const [fileStr, rankStr] = targetNotation.split("");
        sourceNotation = getBishopSource({
            file: fileStr,
            rank: rankStr,
            gameState,
        });
    }

    if (code === "R") {
        // Rook move
        const [fileStr, rankStr] = targetNotation.split("");
        sourceNotation = getRookSource({
            file: fileStr,
            rank: rankStr,
            sourceHint,
            gameState,
        });
    }

    if (code === "Q") {
        // Queen move
        sourceNotation = getQueenSource(gameState);
    }

    if (code === "K") {
        // King move
        sourceNotation = getKingSource(gameState);
    }

    return sourceNotation;
};



const getQueenSource = (gameState: GameState): string =>
    getSolePieceSource({ gameState, pieceCode: "Q" });

const getKingSource = (gameState: GameState): string =>
    getSolePieceSource({ gameState, pieceCode: "K" });
