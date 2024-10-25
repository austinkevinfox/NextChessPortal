import { Board } from "@/app/components";
import { BoardPositionHash } from "../Interfaces";

interface Props {
    gameBoardPositions: BoardPositionHash;
    
}

const GameTable = ({ gameBoardPositions }: Props) => {
    return (
        <div className="flex h-[calc(100vh-150px)]">
            <div className="w-1/3 bg-slate-300">side</div>
            <Board positions={gameBoardPositions} />
            <div className="w-1/3 bg-slate-300">side</div>
        </div>
    );
};

export default GameTable;
