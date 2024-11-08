import { Board } from "@/app/components";
import { ReactElement } from "react";
import { BoardPositionHash, CapturedPieces } from "../Interfaces";
import SidePanel from "./SidePanel";


interface Props {
    gameBoardPositions?: BoardPositionHash;
    focusPositions?: string[];
    capturedPieces?: CapturedPieces;
    movesPanel?: ReactElement;
}

const GameTable = ({
    gameBoardPositions,
    focusPositions,
    capturedPieces,
    movesPanel,
}: Props) => {
    return (
        <>
            <div className="flex h-[calc(100vh-150px)]">
                <SidePanel
                    playerColor="black"
                    capturedPieces={capturedPieces}
                />
                <Board
                    positions={gameBoardPositions}
                    focusPositions={focusPositions}
                />
                <SidePanel
                    playerColor="white"
                    capturedPieces={capturedPieces}
                />
                <div className="hidden md:block ml-4">{movesPanel}</div>
            </div>
            <div className="sm:block md:hidden mt-4 ml-5">{movesPanel}</div>
        </>
    );
};

export default GameTable;
