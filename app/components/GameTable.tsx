import { Board } from "@/app/components";
import { ReactElement } from "react";
import SidePanel from "./SidePanel";

interface Props {
    focusPositions?: string[];
    movesPanel?: ReactElement;
}

const GameTable = ({ focusPositions, movesPanel }: Props) => {
    return (
        <>
            <div className="flex h-[calc(100vh-150px)]">
                <SidePanel playerColor="black" />
                <Board focusPositions={focusPositions} />
                <SidePanel playerColor="white" />
                <div className="hidden md:block ml-4">{movesPanel}</div>
            </div>
            <div className="sm:block md:hidden mt-4 ml-5">{movesPanel}</div>
        </>
    );
};

export default GameTable;
