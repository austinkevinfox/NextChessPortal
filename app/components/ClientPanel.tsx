"use client";
import { Game } from "@prisma/client";
import ControlPanel from "./ControlPanel";
import GameTable from "./GameTable";
import { useMemo, useState } from "react";
import { getGameBoardPositions, loadGame } from "../services/services";

const ClientPanel = ({ game }: { game: Game }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const loadedGame = useMemo(() => loadGame(game.moves!), [game.moves]);
    const gameBoardPositions = useMemo(
        () => getGameBoardPositions(loadedGame),
        [loadedGame]
    );

    const incrementStepIndex = () => {
        if (stepIndex < loadedGame.length) {
            setStepIndex((prev) => prev + 1);
        }
    };

    const decrementStepIndex = () => {
        if (stepIndex > 0) {
            setStepIndex((prev) => prev - 1);
        }
    };

    return (
        <>
            <ControlPanel
                moves={loadedGame}
                onForwardStep={incrementStepIndex}
                onBackwardStep={decrementStepIndex}
                stepIndex={stepIndex}
            />

            <GameTable gameBoardPositions={gameBoardPositions[stepIndex]} />
        </>
    );
};

export default ClientPanel;
