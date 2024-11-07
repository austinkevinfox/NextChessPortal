import { ReactNode } from "react";
import { BoardPositionHash } from "../Interfaces";
import Square from "./Square";
import { getFileRankFromIndices } from "../services/PieceServices";

interface Props {
    positions: BoardPositionHash;
    focusPositions: string[];
}

const Board = ({ positions, focusPositions }: Props) => {
    const colors: { [key: string]: string } = {
        white: "bg-slate-100",
        black: "bg-slate-800",
    };

    const getSquareColor = (rank: number, fileIndex: number): string => {
        let squareColor = "";
        if (rank % 2 === 0) {
            squareColor = fileIndex % 2 === 0 ? "white" : "black";
        } else {
            squareColor = fileIndex % 2 === 0 ? "black" : "white";
        }
        return colors[squareColor];
    };

    return (
        <div className="h-full aspect-square flex flex-wrap">
            {[8, 7, 6, 5, 4, 3, 2, 1].map((rank): ReactNode => {
                return [0, 1, 2, 3, 4, 5, 6, 7].map((index): ReactNode => {
                    const positionKey = getFileRankFromIndices(index, rank);
                    return (
                        <Square
                            key={rank + index}
                            bgColor={getSquareColor(rank, index)}
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
