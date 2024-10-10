import React from "react";
import Board from "../components/Board";

const LiveGame = () => {
    return (
        <div className="flex h-full">
            <div className="w-1/3 bg-slate-300">side</div>
            <Board />
            <div className="w-1/3 bg-slate-300">side</div>
        </div>
    );
};

export default LiveGame;
