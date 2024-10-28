import { Board } from "@/app/components";
import { BoardPositionHash } from "../Interfaces";
import { ReactElement } from "react";
// import { div, Flex } from "@radix-ui/themes";

interface Props {
    gameBoardPositions: BoardPositionHash;
    movesPanel: ReactElement;
}

const GameTable = ({ gameBoardPositions, movesPanel }: Props) => {
    return (
        <>
            <div className="flex h-[calc(100vh-150px)]">
                <div className="hidden md:block w-52 h-1/2 p-4 bg-slate-300">
                    side
                </div>
                <Board positions={gameBoardPositions} />
                <div className="hidden md:block w-52 h-1/2 p-4 bg-slate-300">
                    side
                </div>
                <div className="hidden md:block ml-9">{movesPanel}</div>
            </div>
            <div className="sm:block md:hidden mt-4 ml-5">{movesPanel}</div>
        </>
    );
};

export default GameTable;
