import { BoardPositionHash, CheckNotice, Position } from "@/app/Interfaces";
import { getIsBishopDefendingSquare } from "./AlgebraicBishopPositionServices";
import {
    getAlgebraicKingMoves,
    getKingSquare,
    isMate,
} from "./AlgebraicKingPositionServices";
import {
    getIsKnightDefendingSquare,
    getKnightThreats,
} from "./AlgebraicKnightPositionServices";
import { Files } from "./AlgebraicNotationConstants";
import {
    getIsPawnDefendingSquare,
    getPawnThreats,
} from "./AlgebraicPawnPositionServices";
import { getIsQueenDefendingSquare } from "./AlgebraicQueenPositionServices";
import { getIsRookDefendingSquare } from "./AlgebraicRookPositionServices";

declare type AttackerPositions = {
    bishop: string[];
    rook: string[];
    queen: string[];
};

declare type FileType = keyof typeof Files;
declare type AttackerType = keyof AttackerPositions;

export const getNorthFile = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, 1);

export const getNorthFile1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, 1, true);

export const getSouthFile = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, -1);

export const getSouthFile1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, -1, true);

export const getEastRank = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, 1);

export const getEastRank1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, 1, true);

export const getWestRank = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, -1);

export const getWestRank1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, -1, true);

export const getNorthWestDiagonal = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, 1);

export const getNorthWestDiagonal1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, 1, true);

export const getNorthEastDiagonal = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, 1);

export const getNorthEastDiagonal1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, 1, true);

export const getSouthWestDiagonal = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, -1);

export const getSouthWestDiagonal1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, -1, true);

export const getSouthEastDiagonal = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, -1);

export const getSouthEastDiagonal1Space = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, -1, true);

export const getThreatsByPiece = ({
    boardPositions,
    activePlayer,
    pieceName,
    callback,
}: {
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
    pieceName: string;
    callback: (
        file: string,
        rankNumber: number,
        boardPositions: BoardPositionHash,
        activePlayer: "white" | "black"
    ) => string[];
}): string[] => {
    let threats: string[] = [];
    const opposingPositions = getOpposingPiecePositions({
        boardPositions,
        activePlayer,
        pieceName,
    });

    opposingPositions.forEach((position) => {
        const [file, rank] = position.split("");
        const moves = callback(
            file,
            parseInt(rank),
            boardPositions,
            activePlayer === "white" ? "black" : "white"
        );
        threats = [...threats, ...moves];
    });

    return threats;
};

const getOpposingPiecePositions = ({
    boardPositions,
    activePlayer,
    pieceName,
}: {
    boardPositions: BoardPositionHash;
    activePlayer: "white" | "black";
    pieceName: string;
}): string[] =>
    Object.keys(boardPositions).filter(
        (notation) =>
            boardPositions[notation]?.name === pieceName &&
            boardPositions[notation]?.color !== activePlayer
    );

const getDiagonal = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string,
    fileIncrement: number,
    rankIncrement: number,
    isLimit1Space = false
) => {
    const [originFileString, originRankString] = origin.split("");
    const originFileIndex = Files[originFileString as FileType];
    const originRank = parseInt(originRankString);
    let nextFileIndex = originFileIndex + fileIncrement;
    let nextRank = originRank + rankIncrement;
    let nextNotation = Files[nextFileIndex] + nextRank;
    let nextPosition = boardPositions[nextNotation];
    let diagonal: string[] = [];
    let isLimitReached = false;

    while (nextPosition !== undefined && !isLimitReached) {
        isLimitReached = isLimit1Space;
        if (nextPosition === null) {
            diagonal.push(nextNotation);
            nextFileIndex += fileIncrement;
            nextRank += rankIncrement;
            nextNotation = Files[nextFileIndex] + nextRank;
            nextPosition = boardPositions[nextNotation];
        } else if (nextPosition?.color !== activePlayer) {
            diagonal.push(nextNotation);
            isLimitReached = true;
        } else {
            isLimitReached = true;
        }
    }

    return diagonal;
};

const getFileLine = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string,
    rankIncrement: number,
    isLimit1Space = false
) => {
    const [originFileString, originRankString] = origin.split("");
    const originRank = parseInt(originRankString);
    const pieceMoving = boardPositions[origin]!;
    let nextRank = originRank + rankIncrement;
    let nextNotation = originFileString + nextRank;
    let nextPosition = boardPositions[nextNotation];
    let fileLine: string[] = [];
    let isLimitReached = false;

    while (nextPosition !== undefined && !isLimitReached) {
        isLimitReached = isLimit1Space;
        if (nextPosition === null) {
            fileLine.push(nextNotation);
            nextRank += rankIncrement;
            nextNotation = originFileString + nextRank;
            nextPosition = boardPositions[nextNotation];
        } else if (
            nextPosition?.color !== activePlayer &&
            pieceMoving!.name !== "pawn"
        ) {
            fileLine.push(nextNotation);
            isLimitReached = true;
        } else {
            isLimitReached = true;
        }
    }

    return fileLine;
};

export const isSquareDefended = ({
    square,
    boardPositions,
    defendingPlayer,
}: {
    square: string;
    boardPositions: BoardPositionHash;
    defendingPlayer: "white" | "black";
}): boolean => {
    if (
        getIsPawnDefendingSquare({
            defendingPlayer,
            boardPositions,
            square,
        })
    ) {
        return true;
    }

    if (
        getIsKnightDefendingSquare({
            defendingPlayer,
            boardPositions,
            square,
        })
    ) {
        return true;
    }

    if (
        getIsBishopDefendingSquare({
            defendingPlayer,
            boardPositions,
            square,
        })
    ) {
        return true;
    }

    if (
        getIsRookDefendingSquare({
            defendingPlayer,
            boardPositions,
            square,
        })
    ) {
        return true;
    }

    if (
        getIsQueenDefendingSquare({
            defendingPlayer,
            boardPositions,
            square,
        })
    ) {
        return true;
    }
    return false;
};

const getRankLine = (
    origin: string,
    boardPositions: BoardPositionHash,
    activePlayer: string,
    fileIncrement: number,
    isLimit1Space = false
) => {
    const [originFileString, originRankString] = origin.split("");
    const originFileIndex = Files[originFileString as FileType];
    let nextFileIndex = originFileIndex + fileIncrement;
    let nextNotation = Files[nextFileIndex] + originRankString;
    let nextPosition = boardPositions[nextNotation];
    let rankLine: string[] = [];
    let isLimitReached = false;

    while (nextPosition !== undefined && !isLimitReached) {
        isLimitReached = isLimit1Space;
        if (nextPosition === null) {
            rankLine.push(nextNotation);
            nextFileIndex += fileIncrement;
            nextNotation = Files[nextFileIndex] + originRankString;
            nextPosition = boardPositions[nextNotation];
        } else if (nextPosition?.color !== activePlayer) {
            rankLine.push(nextNotation);
            isLimitReached = true;
        } else {
            isLimitReached = true;
        }
    }

    return rankLine;
};

export const getKingThreats = (
    boardPositions: BoardPositionHash,
    nextPlayer: "white" | "black",
    targetSquare: string
): CheckNotice | null => {
    const kingSquare = getKingSquare({
        boardPositions,
        activePlayer: nextPlayer,
    });
    const [kingFileStr, kingRankStr] = kingSquare.split("");
    const kingFileIndex = Files[kingFileStr as FileType];
    const kingRank = parseInt(kingRankStr);
    const moves: string[] = [];
    let allChecks: Position[] = [];
    let areChecksNegligible: boolean[] = [];

    // Build Attacker Positions
    let attackerPositions: AttackerPositions = {
        bishop: [],
        rook: [],
        queen: [],
    };

    Object.keys(attackerPositions).forEach((key) => {
        attackerPositions[key as AttackerType] = Object.keys(
            boardPositions
        ).filter(
            (algebraic) =>
                boardPositions[algebraic]?.name === key &&
                boardPositions[algebraic]?.color !== nextPlayer
        );
    });

    attackerPositions.bishop.forEach((bishopPosition) => {
        const [bishopFileStr, bishopRankStr] = bishopPosition.split("");
        const bishopFileIndex = Files[bishopFileStr as FileType];
        const bishopRank = parseInt(bishopRankStr);

        const deltaRank = Math.abs(kingRank - bishopRank);
        const deltaFile = Math.abs(kingFileIndex - bishopFileIndex);
        let squares: string[] = [];
        let bishopCheck = null;

        if (
            Math.abs(kingFileIndex - bishopFileIndex) === 1 &&
            Math.abs(kingRank - bishopRank) === 1
        ) {
            bishopCheck = {
                square: bishopPosition,
                piece: boardPositions[bishopPosition],
            };
            squares = [bishopPosition];
        } else if (deltaRank === deltaFile) {
            // Bishop has a path to King
            squares = getDiagonalSquares({
                moves,
                kingFileIndex,
                kingRank,
                attackerFileIndex: bishopFileIndex,
                attackerRank: bishopRank,
            });
        }

        if (!bishopCheck && squares.length > 0) {
            bishopCheck = getChecksByClearPath({
                boardPositions,
                pieceNotation: bishopPosition,
                squares,
            });
        }

        if (bishopCheck) {
            allChecks.push(bishopCheck);

            const isSomeCheckPathDefended = squares.some((square) =>
                isSquareDefended({
                    square,
                    boardPositions,
                    defendingPlayer: nextPlayer,
                })
            );

            areChecksNegligible.push(isSomeCheckPathDefended);
        }
    });

    attackerPositions.rook.forEach((rookPosition) => {
        const [rookFileStr, rookRankStr] = rookPosition.split("");
        const rookFileIndex = Files[rookFileStr as FileType];
        const rookRank = parseInt(rookRankStr);
        let squares: string[] = [];
        let rookCheck = null;

        if (rookFileIndex === kingFileIndex) {
            if (Math.abs(kingRank - rookRank) === 1) {
                rookCheck = {
                    square: rookPosition,
                    piece: boardPositions[rookPosition],
                };
            } else {
                // Rook has north/south path to King
                squares = getStraightLineSquares({
                    moves,
                    kingIndex: kingRank,
                    attackerIndex: rookRank,
                    type: "File",
                    lineIndex: rookFileIndex,
                });
            }
        }

        if (rookRank === kingRank) {
            if (Math.abs(kingFileIndex - rookFileIndex) === 1) {
                rookCheck = {
                    square: rookPosition,
                    piece: boardPositions[rookPosition],
                };
            } else {
                // Rook has east/west path to King
                squares = getStraightLineSquares({
                    moves,
                    kingIndex: kingFileIndex,
                    attackerIndex: rookFileIndex,
                    type: "Rank",
                    lineIndex: rookRank,
                });
            }
        }

        if (!rookCheck && squares.length > 0) {
            rookCheck = getChecksByClearPath({
                boardPositions,
                pieceNotation: rookPosition,
                squares,
            });
        }

        if (rookCheck) {
            allChecks.push(rookCheck);
            const isSomeCheckPathDefended = squares.some((square) =>
                isSquareDefended({
                    square,
                    boardPositions,
                    defendingPlayer: nextPlayer,
                })
            );

            areChecksNegligible.push(isSomeCheckPathDefended);
        }
    });

    attackerPositions.queen.forEach((queenPosition) => {
        const [queenFileStr, queenRankStr] = queenPosition.split("");
        const queenFileIndex = Files[queenFileStr as FileType];
        const queenRank = parseInt(queenRankStr);
        const deltaRank = Math.abs(kingRank - queenRank);
        const deltaFile = Math.abs(kingFileIndex - queenFileIndex);
        let squares: string[] = [];
        let queenCheck = null;

        if (
            Math.abs(kingFileIndex - queenFileIndex) === 1 &&
            Math.abs(kingRank - queenRank) === 1
        ) {
            queenCheck = {
                square: queenPosition,
                piece: boardPositions[queenPosition],
            };
        } else if (deltaRank === deltaFile) {
            // Queen has a path to King
            squares = getDiagonalSquares({
                moves,
                kingFileIndex,
                kingRank,
                attackerFileIndex: queenFileIndex,
                attackerRank: queenRank,
            });
        }

        if (queenFileIndex === kingFileIndex) {
            if (Math.abs(kingRank - queenRank) === 1) {
                queenCheck = {
                    square: queenPosition,
                    piece: boardPositions[queenPosition],
                };
            } else {
                // Queen has north/south path to King
                squares = getStraightLineSquares({
                    moves,
                    kingIndex: kingRank,
                    attackerIndex: queenRank,
                    type: "File",
                    lineIndex: queenFileIndex,
                });
            }
        }

        if (queenRank === kingRank) {
            if (Math.abs(kingFileIndex - queenFileIndex) === 1) {
                queenCheck = {
                    square: queenPosition,
                    piece: boardPositions[queenPosition],
                };
            } else {
                // Queen has east/west path to King
                squares = getStraightLineSquares({
                    moves,
                    kingIndex: kingFileIndex,
                    attackerIndex: queenFileIndex,
                    type: "Rank",
                    lineIndex: queenRank,
                });
            }
        }

        if (!queenCheck && squares.length > 0) {
            queenCheck = getChecksByClearPath({
                boardPositions,
                pieceNotation: queenPosition,
                squares,
            });
        }
        if (queenCheck) {
            allChecks.push(queenCheck);
            const isSomeCheckPathDefended = squares.some((square) =>
                isSquareDefended({
                    square,
                    boardPositions,
                    defendingPlayer: nextPlayer,
                })
            );

            areChecksNegligible.push(isSomeCheckPathDefended);
        }
    });

    if (boardPositions[targetSquare]?.name === "knight") {
        const knightThreats = getKnightThreats(boardPositions, nextPlayer);
        const kingMoves = getAlgebraicKingMoves(
            kingFileStr,
            kingRank,
            boardPositions,
            nextPlayer,
            false,
            false,
            false
        );

        knightThreats.forEach((knightAttack) => {
            if (knightAttack === kingSquare) {
                allChecks.push({
                    square: targetSquare,
                    piece: boardPositions[targetSquare],
                });

                const isCheckNegligible =
                    kingMoves.length > 0 ||
                    isSquareDefended({
                        square: targetSquare,
                        boardPositions,
                        defendingPlayer: nextPlayer,
                    });

                areChecksNegligible.push(isCheckNegligible);
            }
        });
    }

    if (boardPositions[targetSquare]?.name === "pawn") {
        const pawnThreats = getPawnThreats({
            activePlayer: nextPlayer,
            targetSquare,
        });
        const kingMoves = getAlgebraicKingMoves(
            kingFileStr,
            kingRank,
            boardPositions,
            nextPlayer,
            false,
            false,
            false
        );

        if (pawnThreats.includes(kingSquare)) {
            allChecks.push({
                square: targetSquare,
                piece: boardPositions[targetSquare],
            });
            const isCheckNegligible =
                kingMoves.length > 0 ||
                isSquareDefended({
                    square: targetSquare,
                    boardPositions,
                    defendingPlayer: nextPlayer,
                });

            areChecksNegligible.push(isCheckNegligible);
        }
    }

    return allChecks.length > 0
        ? {
              positions: allChecks,
              isMate: isMate({
                  boardPositions,
                  activePlayer: nextPlayer,
                  areChecksNegligible,
              }),
          }
        : null;
};

export const omitKingExposingThreats = (
    file: string,
    rank: string,
    moves: string[],
    boardPositions: BoardPositionHash,
    activePlayer: string
): string[] => {
    const kingSquare = getKingSquare({ boardPositions, activePlayer });
    const [kingFileStr, kingRankStr] = kingSquare.split("");
    const kingFileIndex = Files[kingFileStr as FileType];
    const kingRank = parseInt(kingRankStr);
    let tmpMoves = [...moves];
    // Build Attacker Positions
    let attackerPositions: AttackerPositions = {
        bishop: [],
        rook: [],
        queen: [],
    };

    Object.keys(attackerPositions).forEach((key) => {
        attackerPositions[key as AttackerType] = Object.keys(
            boardPositions
        ).filter(
            (algebraic) =>
                boardPositions[algebraic]?.name === key &&
                boardPositions[algebraic]?.color !== activePlayer
        );
    });

    attackerPositions.bishop.forEach((bishopPosition) => {
        const [bishopFileStr, bishopRankStr] = bishopPosition.split("");
        const bishopFileIndex = Files[bishopFileStr as FileType];
        const bishopRank = parseInt(bishopRankStr);

        const deltaRank = Math.abs(kingRank - bishopRank);
        const deltaFile = Math.abs(kingFileIndex - bishopFileIndex);
        let squares: string[] = [];

        if (deltaRank === deltaFile) {
            // Bishop has a path to King
            squares = getDiagonalSquares({
                moves,
                kingFileIndex,
                kingRank,
                attackerFileIndex: bishopFileIndex,
                attackerRank: bishopRank,
            });
        }

        if (squares.length) {
            tmpMoves = getMovesFilteredForKingSafety({
                file,
                rank,
                moves,
                boardPositions,
                squares,
            });
        }
    });

    attackerPositions.rook.forEach((rookPosition) => {
        const [rookFileStr, rookRankStr] = rookPosition.split("");
        const rookFileIndex = Files[rookFileStr as FileType];
        const rookRank = parseInt(rookRankStr);
        let squares: string[] = [];

        if (rookFileIndex === kingFileIndex) {
            // Rook has north/south path to King
            squares = getStraightLineSquares({
                moves,
                kingIndex: kingRank,
                attackerIndex: rookRank,
                type: "File",
                lineIndex: rookFileIndex,
            });
        }

        if (rookRank === kingRank) {
            // Rook has east/west path to King
            squares = getStraightLineSquares({
                moves,
                kingIndex: kingFileIndex,
                attackerIndex: rookFileIndex,
                type: "Rank",
                lineIndex: rookRank,
            });
        }

        if (squares.length) {
            tmpMoves = getMovesFilteredForKingSafety({
                file,
                rank,
                moves,
                boardPositions,
                squares,
            });
        }
    });

    attackerPositions.queen.forEach((queenPosition) => {
        const [queenFileStr, queenRankStr] = queenPosition.split("");
        const queenFileIndex = Files[queenFileStr as FileType];
        const queenRank = parseInt(queenRankStr);
        const deltaRank = Math.abs(kingRank - queenRank);
        const deltaFile = Math.abs(kingFileIndex - queenFileIndex);
        let squares: string[] = [];

        if (deltaRank === deltaFile) {
            // Queen has a path to King
            squares = getDiagonalSquares({
                moves,
                kingFileIndex,
                kingRank,
                attackerFileIndex: queenFileIndex,
                attackerRank: queenRank,
            });
        }

        if (queenFileIndex === kingFileIndex) {
            // Queen has north/south path to King
            squares = getStraightLineSquares({
                moves,
                kingIndex: kingRank,
                attackerIndex: queenRank,
                type: "File",
                lineIndex: queenFileIndex,
            });
        }

        if (queenRank === kingRank) {
            // Queen has east/west path to King
            squares = getStraightLineSquares({
                moves,
                kingIndex: kingFileIndex,
                attackerIndex: queenFileIndex,
                type: "Rank",
                lineIndex: queenRank,
            });
        }

        if (squares.length) {
            tmpMoves = getMovesFilteredForKingSafety({
                file,
                rank,
                moves,
                boardPositions,
                squares,
            });
        }
    });

    return tmpMoves;
};

interface StraightLineInterface {
    moves: string[];
    kingIndex: number;
    attackerIndex: number;
    type: "File" | "Rank";
    lineIndex: number;
}
const getStraightLineSquares = ({
    moves,
    kingIndex,
    attackerIndex,
    type,
    lineIndex,
}: StraightLineInterface): string[] => {
    const nextIncrement = attackerIndex > kingIndex ? -1 : 1;
    const lineId: string | number =
        type === "File" ? Files[lineIndex] : lineIndex;
    let tmpMoves = [...moves];
    let squares: string[] = [];
    let nextIndex = attackerIndex;

    while (nextIndex !== kingIndex) {
        let notation =
            type === "File"
                ? <string>lineId + nextIndex
                : Files[nextIndex] + <number>lineId;
        squares.push(notation);
        nextIndex += nextIncrement;
    }

    return squares;
};

interface DiagonalInterface {
    moves: string[];
    kingFileIndex: number;
    kingRank: number;
    attackerFileIndex: number;
    attackerRank: number;
}
const getDiagonalSquares = ({
    moves,
    kingFileIndex,
    kingRank,
    attackerFileIndex,
    attackerRank,
}: DiagonalInterface): string[] => {
    let tmpMoves = [...moves];
    const fileDirection: string =
        kingFileIndex < attackerFileIndex ? "west" : "east";
    const rankDirection: string = kingRank < attackerRank ? "south" : "north";
    const nextFileIncrement = fileDirection === "west" ? -1 : 1;
    const nextRankIncrement = rankDirection === "south" ? -1 : 1;
    let nextFileIndex = attackerFileIndex; // + nextFileIncrement;
    let nextRank = attackerRank; // + nextRankIncrement;
    let nextFile: string;
    let diagonalSquares: string[] = [];

    while (nextRank !== kingRank) {
        nextFile = Files[nextFileIndex];
        diagonalSquares.push(nextFile + nextRank);
        nextFileIndex += nextFileIncrement;
        nextRank += nextRankIncrement;
    }

    return diagonalSquares;
};

const getDiagonalSquaresToKing = ({
    kingFileIndex,
    kingRank,
    attackerFileIndex,
    attackerRank,
}: DiagonalInterface): string[] => {
    const fileDirection: string =
        kingFileIndex < attackerFileIndex ? "west" : "east";
    const rankDirection: string = kingRank < attackerRank ? "south" : "north";
    const nextFileIncrement = fileDirection === "west" ? -1 : 1;
    const nextRankIncrement = rankDirection === "south" ? -1 : 1;
    let nextFileIndex = attackerFileIndex; // + nextFileIncrement;
    let nextRank = attackerRank; // + nextRankIncrement;
    let nextFile: string;
    let diagonalSquares: string[] = [];

    while (nextRank !== kingRank) {
        nextFile = Files[nextFileIndex];
        diagonalSquares.push(nextFile + nextRank);
        nextFileIndex += nextFileIncrement;
        nextRank += nextRankIncrement;
    }

    return diagonalSquares;
};

const getIsSquareOccupied = ({
    boardPositions,
    algebraicNotation,
}: {
    boardPositions: BoardPositionHash;
    algebraicNotation: string;
}): boolean => boardPositions[algebraicNotation] !== null;

const getMovesFilteredForKingSafety = ({
    moves,
    file,
    rank,
    boardPositions,
    squares,
}: {
    moves: string[];
    file: string;
    rank: string;
    boardPositions: BoardPositionHash;
    squares: string[];
}): string[] => {
    let isBlock = false;
    squares.slice(1).every((square) => {
        if (square !== file + rank) {
            isBlock = getIsSquareOccupied({
                boardPositions,
                algebraicNotation: square,
            });
        }
        return !isBlock;
    });

    return isBlock ? moves : moves.filter((move) => squares.includes(move));
};

const getChecksByClearPath = ({
    boardPositions,
    pieceNotation,
    squares,
}: {
    boardPositions: BoardPositionHash;
    pieceNotation: string;
    squares: string[];
}): Position | null => {
    let isPieceChecking = false;

    squares
        .filter((square) => square !== pieceNotation)
        .every((square) => {
            isPieceChecking = boardPositions[square] === null;
            return isPieceChecking;
        });

    if (isPieceChecking) {
        return {
            square: pieceNotation,
            piece: boardPositions[pieceNotation],
        };
    }
    return null;
};
