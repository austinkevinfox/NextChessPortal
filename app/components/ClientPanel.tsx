"use client";
import { Game } from "@prisma/client";
import { useMemo, useState } from "react";
import { getArrayOfMoves, getGameBoardPositions } from "../services/services";
import ControlPanel from "./ControlPanel";
import GameTable from "./GameTable";
import MovesPanel from "./MovesPanel/MovesPanel";

const ClientPanel = ({ game }: { game: Game }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const moves = useMemo(() => getArrayOfMoves(game.moves!), [game.moves]);
    const gameBoardPositions = useMemo(
        () => getGameBoardPositions(moves),
        [moves]
    );

    const incrementStepIndex = () => {
        if (stepIndex < moves.length) {
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
                moves={moves}
                onForwardStep={incrementStepIndex}
                onBackwardStep={decrementStepIndex}
                stepIndex={stepIndex}
            />

            <GameTable
                gameBoardPositions={gameBoardPositions[stepIndex]}
                movesPanel={
                    <MovesPanel
                        moves={moves}
                        stepIndex={stepIndex}
                        onStepClick={setStepIndex}
                    />
                }
            />
        </>
    );
};

export default ClientPanel;
