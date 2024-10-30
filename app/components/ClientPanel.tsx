"use client";
import { Game } from "@prisma/client";
import { useMemo, useState } from "react";
import { getArrayOfMoves, getStepData } from "../services/services";
import ControlPanel from "./ControlPanel";
import GameTable from "./GameTable";
import MovesPanel from "./MovesPanel/MovesPanel";
import useStepStore from "../state-management/step/store";

const ClientPanel = ({ game }: { game: Game }) => {
    const { stepIndex } = useStepStore();
    const moves = useMemo(() => getArrayOfMoves(game.moves!), [game.moves]);
    const stepData = useMemo(() => getStepData(moves), [moves]);

    return (
        <>
            <ControlPanel moves={moves} />

            <GameTable
                gameBoardPositions={stepData[stepIndex].boardPositions}
                capturedPieces={stepData[stepIndex].capturedPieces}
                movesPanel={
                    <MovesPanel
                        moves={moves}
                        
                    />
                }
            />
        </>
    );
};

export default ClientPanel;
