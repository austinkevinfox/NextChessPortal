"use client";
import useStepStore from "@/app/state-management/step/store";
import GameTable from "@/app/components/GameTable";
import { useEffect } from "react";

const LiveGame = () => {
    const { setLive } = useStepStore();

    useEffect(() => {
        setLive(true);
    }, []);
    return <GameTable />;
};

export default LiveGame;
