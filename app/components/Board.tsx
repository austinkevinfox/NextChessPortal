"use client";
import { ReactNode, useEffect } from "react";
import { Piece } from "../Interfaces";
import { getFileRankFromIndices } from "../services/PieceServices";
import useStepStore from "../state-management/step/store";
import { initialPositions } from "./PositionConstants";
import Square from "./Square/Square";

interface Props {
    focusPositions: string[] | undefined;
}

const Board = ({ focusPositions = [] }: Props) => {
    const {
        isLive,
        activePlayer,
        source,
        sourceSquare,
        targetSquare,
        targetSquarePotentials,
        boardPositions,
        setActivePlayer,
        setSource,
        setSourceSquare,
        setTargetSquarePotentials,
        setTargetSquare,
        setBoardPositions,
    } = useStepStore();

    useEffect(() => {
        setBoardPositions(initialPositions);
    }, []);

    const getColor = (rank: number, fileIndex: number): "white" | "black" => {
        if (rank % 2 === 0) {
            return fileIndex % 2 === 0 ? "white" : "black";
        } else {
            return fileIndex % 2 === 0 ? "black" : "white";
        }
    };

    //  const getMovesByPiece = (
    //      pieceToMove: string,
    //      file: string,
    //      rank: string
    //  ) => {
    //      const tmpPositions = [...positions];
    //      let possibleMoves: number[] = [];
    //      let targetAlgebraicNotations: string[] = [];

    //      if (pieceToMove === "pawn") {
    //          targetAlgebraicNotations = getAlgebraicPawnMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              enPassanNotation,
    //              activePlayer
    //          );
    //      }

    //      if (pieceToMove === "knight") {
    //          targetAlgebraicNotations = getAlgebraicKnightMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //          targetAlgebraicNotations = targetAlgebraicNotations.filter(
    //              (notation) => {
    //                  let position = tmpPositions.find(
    //                      (item) => item.algebraicNotation === notation
    //                  );
    //                  return (
    //                      position?.piece === null ||
    //                      position?.piece.color !== activePlayer
    //                  );
    //              }
    //          );
    //      }

    //      if (pieceToMove === "bishop") {
    //          targetAlgebraicNotations = getAlgebraicBishopMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //      }

    //      if (pieceToMove === "rook") {
    //          targetAlgebraicNotations = getAlgebraicRookMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //      }

    //      if (pieceToMove === "queen") {
    //          targetAlgebraicNotations = getAlgebraicQueenMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer
    //          );
    //      }

    //      if (pieceToMove === "king") {
    //          const isKingSideCastleAvailable =
    //              activePlayer === "white"
    //                  ? isWhiteKingSideCastleAvailable
    //                  : isBlackKingSideCastleAvailable;
    //          const isQueenSideCastleAvailable =
    //              activePlayer === "white"
    //                  ? isWhiteQueenSideCastleAvailable
    //                  : isBlackQueenSideCastleAvailable;
    //          targetAlgebraicNotations = getAlgebraicKingMoves(
    //              file,
    //              rank,
    //              tmpPositions,
    //              activePlayer,
    //              isKingSideCastleAvailable,
    //              isQueenSideCastleAvailable
    //          );
    //      }

    //      possibleMoves = targetAlgebraicNotations.map(
    //          (notation) =>
    //              tmpPositions.findIndex(
    //                  (position) => position.algebraicNotation === notation
    //              ) + 1
    //      );

    //      setDropTargets(possibleMoves);
    //  };

    const handleTargetClick = (algebraic: string): void => {
        let tmpPositions = { ...boardPositions };
        tmpPositions[algebraic] = source!.piece;
        tmpPositions[source!.square] = null;
        setBoardPositions(tmpPositions);
        setSource({ ...source, piece: null });
        setTargetSquarePotentials([]);
        setActivePlayer(activePlayer === "white" ? "black" : "white");
    };

    const initMove = ({
        file,
        rank,
        piece,
    }: {
        file: string;
        rank: number;
        piece: Piece | null;
    }) => {
        setSourceSquare(`${file}${rank}`);
        setTargetSquarePotentials(["e3", "e4"]);
    };

    const moveToVacantSquare = (algebraicCoordinate: string) => {
        setTargetSquare(algebraicCoordinate);
    };

    return (
        <div className="h-full aspect-square flex flex-wrap">
            {[8, 7, 6, 5, 4, 3, 2, 1].map((rank): ReactNode => {
                return [0, 1, 2, 3, 4, 5, 6, 7].map((index): ReactNode => {
                    const positionKey = getFileRankFromIndices(index, rank);
                    return (
                        <Square
                            key={positionKey}
                            color={getColor(rank, index)}
                            fileIndex={index}
                            rank={rank}
                            piece={boardPositions[positionKey]}
                            isFocus={focusPositions.includes(positionKey)}
                            onTargetClick={handleTargetClick}
                        />
                    );
                });
            })}
        </div>
    );
};

export default Board;
