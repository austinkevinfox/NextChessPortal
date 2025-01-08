import { BoardPositionHash } from "@/app/Interfaces";
import {
    getEastRank1Space,
    getNorthEastDiagonal1Space,
    getNorthFile1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthFile1Space,
    getSouthWestDiagonal1Space,
    getWestRank1Space,
    isSquareCapturable,
    isSquareDefended,
} from "./AlgebraicPositionServices";

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

    const kingMoves = [
        ...northFile,
        ...eastRank,
        ...southFile,
        ...westRank,
        ...northEastDiagonal,
        ...northWestDiagonal,
        ...southEastDiagonal,
        ...southWestDiagonal,
    ];

    return kingMoves.filter(
        (square) =>
            !isSquareCapturable({
                square,
                boardPositions,
                defendingPlayer: activePlayer === "white" ? "black" : "white",
            })
    );
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
