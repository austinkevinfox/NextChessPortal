"use client";
import { Piece } from "@/app/Interfaces";
import { getEnPassantConfig } from "@/app/services/EnPassantServices";
import { getFileRankFromIndices } from "@/app/services/PieceServices";
import { ReactNode, useEffect } from "react";
import useStepStore from "../state-management/step/store";
import BoardLoadingSpinner from "./Board/BoardLoadingSpinner";
import { initialPositions } from "./PositionConstants";
import Square from "./Square/Square";

const Board = () => {
    const {
        activePlayer,
        source,
        boardPositions,
        enPassantPotentials,
        setActivePlayer,
        setSource,
        setTargetSquarePotentials,
        setBoardPositions,
        setCapturedPiece,
        setEnPassantPotentials,
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

    const handleTargetClick = (algebraic: string): void => {
        let tmpPositions = { ...boardPositions };

        if (tmpPositions[algebraic]) {
            setCapturedPiece(tmpPositions[algebraic]);
        }

        if (
            algebraic === enPassantPotentials?.target &&
            enPassantPotentials?.capture.length === 2
        ) {
            setCapturedPiece(
                tmpPositions[enPassantPotentials.capture] as Piece
            );
            tmpPositions[enPassantPotentials.capture] = null;
        }

        const enPassantConfig = getEnPassantConfig({
            positions: tmpPositions,
            activePlayer,
            algebraic,
            source,
        });

        setEnPassantPotentials(enPassantConfig);

        tmpPositions[algebraic] = source!.piece;
        tmpPositions[source!.square] = null;
        setBoardPositions(tmpPositions);
        setSource({ ...source, piece: null });
        setTargetSquarePotentials([]);
        setActivePlayer(activePlayer === "white" ? "black" : "white");
    };

    return (
        <div className="relative">
            {Object.keys(boardPositions).length === 0 && (
                <BoardLoadingSpinner />
            )}
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
                                onTargetClick={handleTargetClick}
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default Board;
