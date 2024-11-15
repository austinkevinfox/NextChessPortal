"use client";
import { ReactNode, useEffect } from "react";
import { getFileRankFromIndices } from "../services/PieceServices";
import useStepStore from "../state-management/step/store";
import BoardLoadingSpinner from "./Board/BoardLoadingSpinner";
import { initialPositions } from "./PositionConstants";
import Square from "./Square/Square";

interface Props {
    focusPositions: string[] | undefined;
}

const Board = ({ focusPositions = [] }: Props) => {
    const {
        activePlayer,
        source,
        boardPositions,
        setActivePlayer,
        setSource,
        setTargetSquarePotentials,
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

    const handleTargetClick = (algebraic: string): void => {
        let tmpPositions = { ...boardPositions };
        tmpPositions[algebraic] = source!.piece;
        tmpPositions[source!.square] = null;
        setBoardPositions(tmpPositions);
        setSource({ ...source, piece: null });
        setTargetSquarePotentials([]);
        setActivePlayer(activePlayer === "white" ? "black" : "white");
    };

    return (
        <div className="relative">
            {!boardPositions["a1"] && <BoardLoadingSpinner />}
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
        </div>
    );
};

export default Board;
