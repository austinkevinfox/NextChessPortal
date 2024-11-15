import { Files } from "./AlgebraicNotationConstants";
import {
    getNorthFile1Space,
    getEastRank1Space,
    getSouthFile1Space,
    getWestRank1Space,
    getNorthEastDiagonal1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthWestDiagonal1Space,
} from "./AlgebraicPositionServices";
import { getKnightThreats } from "./AlgebraicKnightPositionServices";
import { getBishopThreats } from "./AlgebraicBishopPositionServices";
// import { getRookThreats } from "./AlgebraicRookPositionServices";
// import { getQueenThreats } from "./AlgebraicQueenPositionServices";
import { BoardPositionHash, Piece } from "@/app/Interfaces";
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
    const kingFileIndex = Files[file as FileType];
    const kingRank = parseInt(rank);
    let squaresUnderAttack: string[] = [
        ...threats.knightThreats,
        ...threats.bishopThreats,
    ];

    // Get squares adjacent to king and threatened by bishop
    // threats.bishopThreats.forEach((bishopNotation) => {
    //     const [bishopFileStr, bishopRankStr] = bishopNotation.split("");
    //     const bishopFileIndex = Files[bishopFileStr as FileType];
    //     const bishopRank = parseInt(bishopRankStr);
    //     const fileDirection: string =
    //         kingFileIndex < bishopFileIndex ? "west" : "east";
    //     const rankDirection: string = kingRank < bishopRank ? "north" : "south";
    //     const nextFileIncrement = fileDirection === "east" ? -1 : 1;
    //     const nextFile: string = Files[kingFileIndex + nextFileIncrement];
    //     const nextRankIncrement = rankDirection === "south" ? -1 : 1;
    //     const nextRank = kingRank + nextRankIncrement;
    //     squaresUnderAttack.push(nextFile! + nextRank!);
    // });

    // Get squares adjacent to king and threatened by rook
    threats.rookThreats.forEach((rookNotation) => {
        const [rookFileStr, rookRankStr] = rookNotation.split("");
        const rookFileIndex = Files[rookFileStr as FileType];
        const rookRank = parseInt(rookRankStr);

        if (kingFileIndex === rookFileIndex) {
            const rankDirection: string =
                kingRank < rookRank ? "north" : "south";
            const nextRankIncrement = rankDirection === "south" ? -1 : 1;
            const nextRank = kingRank + nextRankIncrement;
            squaresUnderAttack.push(rookFileStr + nextRank);
        }

        if (kingRank === rookRank) {
            const fileDirection: string =
                kingFileIndex < rookFileIndex ? "west" : "east";
            const nextFileIncrement = fileDirection === "east" ? -1 : 1;
            const nextFile: string = Files[kingFileIndex + nextFileIncrement];
            squaresUnderAttack.push(nextFile + rookRank);
        }
    });

    // Get squares adjacent to king and threatened by queen
    threats.queenThreats.forEach((queenNotation) => {
        const [queenFileStr, queenRankStr] = queenNotation.split("");
        const queenFileIndex = Files[queenFileStr as FileType];
        const queenRank = parseInt(queenRankStr);

        if (kingFileIndex === queenFileIndex) {
            const rankDirection: string =
                kingRank < queenRank ? "north" : "south";
            const nextRankIncrement = rankDirection === "south" ? -1 : 1;
            const nextRank = kingRank + nextRankIncrement;
            squaresUnderAttack.push(queenFileStr + nextRank);
        } else if (kingRank === queenRank) {
            const fileDirection: string =
                kingFileIndex < queenFileIndex ? "west" : "east";
            const nextFileIncrement = fileDirection === "east" ? -1 : 1;
            const nextFile: string = Files[kingFileIndex + nextFileIncrement];
            squaresUnderAttack.push(nextFile + kingRank);
        } else {
            // Examine diagonals
            const fileDirection: string =
                kingFileIndex < queenFileIndex ? "west" : "east";
            const rankDirection: string =
                kingRank < queenRank ? "north" : "south";
            const nextFileIncrement = fileDirection === "east" ? -1 : 1;
            const nextFile: string = Files[kingFileIndex + nextFileIncrement];
            const nextRankIncrement = rankDirection === "south" ? -1 : 1;
            const nextRank = kingRank + nextRankIncrement;
            squaresUnderAttack.push(nextFile! + nextRank!);
        }
    });

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
    const kingSquareNotation = getKingSquare({
        boardPositions,
        activePlayer,
    });
    threats.knightThreats = getKnightThreats(
        kingSquareNotation,
        boardPositions,
        activePlayer
    );
    threats.bishopThreats = getBishopThreats(boardPositions, activePlayer);
    // threats.rookThreats = getRookThreats(
    //     kingSquareNotation,
    //     boardPositions,
    //     activePlayer
    // );
    // threats.queenThreats = getQueenThreats(
    //     kingSquareNotation,
    //     boardPositions,
    //     activePlayer
    // );

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
