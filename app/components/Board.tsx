import { ReactNode } from "react";
import { BoardPositionHash } from "../Interfaces";
import Square from "./Square/Square";
import { getFileRankFromIndices } from "../services/PieceServices";

interface Props {
    positions: BoardPositionHash;
    focusPositions: string[];
}

const Board = ({ positions, focusPositions }: Props) => {
    const getColor = (rank: number, fileIndex: number): "white" | "black" => {
        if (rank % 2 === 0) {
            return fileIndex % 2 === 0 ? "white" : "black";
        } else {
            return fileIndex % 2 === 0 ? "black" : "white";
        }
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
                            fileIndex={rank === 1 ? index : -1}
                            rank={index === 0 ? rank : 0}
                            piece={positions[positionKey]}
                            isFocus={focusPositions.includes(positionKey)}
                        />
                    );
                });
            })}
        </div>
    );
};

export default Board;
