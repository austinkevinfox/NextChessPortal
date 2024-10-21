import { Board } from "@/app/components";

const LiveGame = () => {
    return (
        <div className="flex h-[calc(100vh-150px)]">
            <div className="w-1/3 bg-slate-300">side</div>
            <Board />
            <div className="w-1/3 bg-slate-300">side</div>
        </div>
    );
};

export default LiveGame;
