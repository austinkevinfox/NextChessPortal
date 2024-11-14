"use client";
import useStepStore from "../state-management/step/store";
import GameTable from "../components/GameTable";
import { useEffect } from "react";

const LiveGame = () => {
    const { setLive } = useStepStore();

    useEffect(() => {
        setLive(true);
    }, []);
    return <GameTable />;
};

export default LiveGame;
