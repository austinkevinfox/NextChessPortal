import { BoardPositionHash } from "@/app/Interfaces";
import { getBishopThreats } from "./AlgebraicBishopPositionServices";
import { getKnightThreats } from "./AlgebraicKnightPositionServices";
import { Files } from "./AlgebraicNotationConstants";
import {
    getEastRank1Space,
    getNorthEastDiagonal1Space,
    getNorthFile1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthFile1Space,
    getSouthWestDiagonal1Space,
    getWestRank1Space,
    isSquareDefended,
} from "./AlgebraicPositionServices";
import { getQueenThreats } from "./AlgebraicQueenPositionServices";
import { getRookThreats } from "./AlgebraicRookPositionServices";
declare type FileType = keyof typeof Files;

interface GetKingMoveSquaresArgs {
    file: string;
    rank: number;
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
}

export const getKingMoveSquares = ({
    file,
    rank,
    boardPositions,
    activePlayer,
}: GetKingMoveSquaresArgs): string[] => {
    const northFile = getNorthFile1Space(
        file + rank,
        boardPositions,
        activePlayer
    );

    const eastRank = getEastRank1Space(
        file + rank,
        boardPositions,
        activePlayer
    );

    const southFile = getSouthFile1Space(
        file + rank,
        boardPositions,
        activePlayer
    );

    const westRank = getWestRank1Space(
        file + rank,
        boardPositions,
        activePlayer
    );

    const northEastDiagonal = getNorthEastDiagonal1Space(
        file + rank,
        boardPositions,
        activePlayer
    );
    const northWestDiagonal = getNorthWestDiagonal1Space(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southEastDiagonal = getSouthEastDiagonal1Space(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southWestDiagonal = getSouthWestDiagonal1Space(
        file + rank,
        boardPositions,
        activePlayer
    );

    // Premptively remove squares of immediate jeopardy
    const threats = getThreatsToKing({
        boardPositions,
        activePlayer,
    });

    let squaresUnderAttack: string[] = [
        ...threats.knightThreats,
        ...threats.bishopThreats,
        ...threats.rookThreats,
        ...threats.queenThreats,
    ];

    let kingMoves = [
        ...northFile,
        ...eastRank,
        ...southFile,
        ...westRank,
        ...northEastDiagonal,
        ...northWestDiagonal,
        ...southEastDiagonal,
        ...southWestDiagonal,
    ];

    kingMoves = getMovesWithoutPawnThreats(
        kingMoves,
        boardPositions,
        activePlayer
    );

    kingMoves.filter((square) => !squaresUnderAttack.includes(square));

    return kingMoves;
};

interface Threats {
    pawnThreats: string[];
    knightThreats: string[];
    bishopThreats: string[];
    rookThreats: string[];
    queenThreats: string[];
}
export const getThreatsToKing = ({
    boardPositions,
    activePlayer,
}: {
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
}): Threats => {
    let threats: Threats = {
        pawnThreats: [],
        knightThreats: [],
        bishopThreats: [],
        rookThreats: [],
        queenThreats: [],
    };

    threats.knightThreats = getKnightThreats(boardPositions, activePlayer);
    threats.bishopThreats = getBishopThreats(boardPositions, activePlayer);
    threats.rookThreats = getRookThreats(boardPositions, activePlayer);
    threats.queenThreats = getQueenThreats(boardPositions, activePlayer);

    return threats;
};

export const getKingSquare = ({
    boardPositions,
    activePlayer,
}: {
    boardPositions: BoardPositionHash;
    activePlayer: string;
}): string => {
    const kingSquare = Object.keys(boardPositions).find(
        (notation) =>
            boardPositions[notation]?.name === "king" &&
            boardPositions[notation]?.color === activePlayer
    );
    return kingSquare!;
};

interface isMateProps {
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
    areChecksNegligible: boolean[];
}

export const isMate = ({
    boardPositions,
    activePlayer,
    areChecksNegligible,
}: isMateProps): boolean => {
    if (areChecksNegligible.some((datum) => datum)) {
        return false;
    }
    return isKingImmovable({
        boardPositions,
        activePlayer,
    });
};

const isKingImmovable = ({
    boardPositions,
    activePlayer,
}: {
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
}): boolean => {
    const kingSquare = getKingSquare({ boardPositions, activePlayer });
    let isKingMovable = false;
    if (kingSquare) {
        const [file, rank] = kingSquare.split("");
        const kingMoveSquares = getKingMoveSquares({
            file,
            rank: parseInt(rank),
            boardPositions,
            activePlayer,
        });

        isKingMovable = kingMoveSquares.some(
            (square) =>
                !isSquareDefended({
                    square,
                    boardPositions,
                    defendingPlayer:
                        activePlayer === "white" ? "black" : "white",
                })
        );
    }

    return !isKingMovable;
};

const getMovesWithoutPawnThreats = (
    kingMoves: string[],
    positions: BoardPositionHash,
    activePlayer: string
): string[] => {
    let safeMoves: string[] = [...kingMoves];

    kingMoves.forEach((kingMove) => {
        const [newFileStr, newRankStr] = kingMove.split("");
        const newFileIndex = Files[newFileStr as FileType];
        const newRank = parseInt(newRankStr);
        const rankIncrement = activePlayer === "white" ? 1 : -1;
        const pawnRank = newRank + rankIncrement;
        if (pawnRank <= 8 && pawnRank >= 1) {
            [-1, 1].forEach((fileIncrement) => {
                const pawnFile = Files[newFileIndex + fileIncrement];
                if (pawnFile) {
                    const pawnPosition = pawnFile + pawnRank;
                    const tmpPosition = positions[pawnPosition];
                    if (
                        tmpPosition?.name === "pawn" &&
                        tmpPosition?.color !== activePlayer
                    ) {
                        safeMoves = safeMoves.filter(
                            (notation) => notation !== kingMove
                        );
                    }
                }
            });
        }
    });

    return safeMoves;
};
