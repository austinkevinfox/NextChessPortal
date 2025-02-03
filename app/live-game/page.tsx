"use client";
import GameTable from "@/app/components/GameTable";
import useStepStore from "@/app/state-management/store";
import { useEffect, useState } from "react";
import MovesPanel from "../components/MovesPanel/MovesPanel";

const LiveGame = () => {
    const [moves, setMoves] = useState<string[]>([]);
    const { setLive, setLoaded, liveMoves } = useStepStore();

    useEffect(() => {
        setLoaded(true);
        setLive(true);
    }, [setLive, setLoaded]);

    useEffect(() => {
        setMoves(liveMoves);
    }, [liveMoves]);

    return <GameTable movesPanel={<MovesPanel moves={moves} />} />;
};

export default LiveGame;
