import { initialPositions } from "@/app/components/PositionConstants";
import { BoardPositionHash } from "@/app/Interfaces";
import { getFileRankFromIndices } from "@/app/services/PieceServices";
import { ReactNode } from "react";
import Square from "./Square/Square";

interface Props {
    positions: BoardPositionHash | undefined;
    focusPositions: string[] | undefined;
}

const Board = ({
    positions = initialPositions,
    focusPositions = [],
}: Props) => {
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
                            fileIndex={index}
                            rank={rank}
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
