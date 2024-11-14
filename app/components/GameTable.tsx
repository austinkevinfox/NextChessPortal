import { Board } from "@/app/components";
import { ReactElement } from "react";
import { CapturedPieces } from "../Interfaces";
import SidePanel from "./SidePanel";

interface Props {
    focusPositions?: string[];
    capturedPieces?: CapturedPieces;
    movesPanel?: ReactElement;
}

const GameTable = ({ focusPositions, capturedPieces, movesPanel }: Props) => {
    return (
        <>
            <div className="flex h-[calc(100vh-150px)]">
                <SidePanel
                    playerColor="black"
                    capturedPieces={capturedPieces}
                />
                <Board focusPositions={focusPositions} />
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
