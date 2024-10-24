import { Board } from "@/app/components";
import { initialPositions } from "@/app/components/PositionConstants";

const GameTable = () => {
    return (
        <div className="flex h-[calc(100vh-150px)]">
            <div className="w-1/3 bg-slate-300">side</div>
            <Board positions={initialPositions} />
            <div className="w-1/3 bg-slate-300">side</div>
        </div>
    );
};

export default GameTable;
