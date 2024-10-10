import React, { ReactNode } from "react";
import Square2 from "./Square2";

const Board2 = () => {
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
                    return (
                        <Square2
                            key={rank + index}
                            bgColor={getSquareColor(rank, index)}
                        />
                    );
                });
            })}
        </div>
    );
};

export default Board2;
