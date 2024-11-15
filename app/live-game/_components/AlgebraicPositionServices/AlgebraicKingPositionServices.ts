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
} from "./AlgebraicPositionServices";
import { getQueenThreats } from "./AlgebraicQueenPositionServices";
import { getRookThreats } from "./AlgebraicRookPositionServices";
declare type FileType = keyof typeof Files;

export const getAlgebraicKingMoves = (
    file: string,
    rankNumber: number,
    boardPositions: BoardPositionHash,
    activePlayer: "white" | "black",
    isKingSideCastleAvailable: boolean,
    isQueenSideCastleAvailable: boolean
): string[] => {
    const rank = rankNumber.toString();
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

    if (isKingSideCastleAvailable) {
        const castlingPosition = activePlayer === "white" ? "g1" : "g8";
        eastRank.push(castlingPosition);
    }

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

    if (isQueenSideCastleAvailable) {
        const castlingPosition = activePlayer === "white" ? "c1" : "c8";
        westRank.push(castlingPosition);
    }

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

    return kingMoves.filter((square) => !squaresUnderAttack.includes(square));
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
}

export const isMate = ({
    boardPositions,
    activePlayer,
}: isMateProps): boolean => {
    const kingSquare = getKingSquare({ boardPositions, activePlayer });
    if (kingSquare) {
        const [file, rank] = kingSquare.split("");
        const kingMoves = getAlgebraicKingMoves(
            file,
            parseInt(rank),
            boardPositions,
            activePlayer,
            false,
            false
        );
        return kingMoves.length === 0;
    }
    return false;
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
