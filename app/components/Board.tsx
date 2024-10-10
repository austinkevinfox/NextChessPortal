import { ReactNode } from "react";
import { Files } from "./PositionConstants";
import Square from "./Square";
import { BoardPositionHash } from "../Interfaces";

interface BoardProps {
    // colors: string[];
    positions?: BoardPositionHash;
    lastSource?: string;
    lastTarget?: string;
}

const Board = ({ positions, lastSource, lastTarget }: BoardProps) => {
    const bgStrings = [
        "even:bg-slate-100 odd:bg-slate-500",
        "even:bg-slate-500 odd:bg-slate-100",
    ];

    return (
        <div className="grid grid-cols-8 h-[calc(100vh-150px)] aspect-square">
            {[8, 7, 6, 5, 4, 3, 2, 1].map((rank): ReactNode => {
                const bgClassUtil = bgStrings.reverse()[0];
                return [0, 1, 2, 3, 4, 5, 6, 7].map((index): ReactNode => {
                    const file = Files[index];
                    const notation = `${file}${rank}`;

                    return (
                        <Square
                            key={notation}
                            bgUtilityClass={bgClassUtil}
                            file={file}
                            rank={rank}
                            piece={positions?.[notation] || null}
                            isLastSource={notation === lastSource}
                            isLastTarget={notation === lastTarget}
                        />
                    );
                });
            })}
        </div>
    );
};

export default Board;
