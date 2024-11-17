"use client";
import { Game } from "@prisma/client";
import { useEffect, useMemo } from "react";
import { getArrayOfMoves, getStepData } from "../services/services";
import useStepStore from "../state-management/step/store";
import ControlPanel from "./ControlPanel";
import GameOverToast from "./GameOverToast";
import GameTable from "./GameTable";
import MovesPanel from "./MovesPanel/MovesPanel";

const ClientPanel = ({ game }: { game: Game }) => {
    const { stepIndex, setStep, setBoardPositions, setCapturedPieces } =
        useStepStore();

    useEffect(() => {
        setStep(0);
    }, []);

    useEffect(() => {
        setBoardPositions(stepData[stepIndex].boardPositions);
        setCapturedPieces(stepData[stepIndex].capturedPieces);
    }, [stepIndex]);

    const { moves, stepData } = useMemo(() => {
        const tmpMoves = getArrayOfMoves(game.moves!);
        const tmpStepData = getStepData(tmpMoves);
        return { moves: tmpMoves, stepData: tmpStepData };
    }, [game.moves]);

    return (
        <>
            <ControlPanel moves={moves} />
            <GameOverToast
                isOpen={stepIndex === moves.length}
                result={game.result}
            />

            <GameTable movesPanel={<MovesPanel moves={moves} />} />
        </>
    );
};

export default ClientPanel;
