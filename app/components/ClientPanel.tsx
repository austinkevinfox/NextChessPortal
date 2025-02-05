"use client";
import { Game } from "@prisma/client";
import { useEffect, useMemo } from "react";
import { getArrayOfMoves, getStepData } from "../services/services";
import useStepStore from "../state-management/store";
import ControlPanel from "./ControlPanel";
import GameOverModal from "./GameOverModal";
import GameTable from "./GameTable";
import MovesPanel from "./MovesPanel/MovesPanel";

const ClientPanel = ({ game }: { game: Game }) => {
    const { stepIndex, setStep, setBoardPositions, setCapturedPieces } =
        useStepStore();

    const { moves, stepData } = useMemo(() => {
        const tmpMoves = getArrayOfMoves(game.moves!);
        const tmpStepData = getStepData(tmpMoves);
        return { moves: tmpMoves, stepData: tmpStepData };
    }, [game.moves]);

    useEffect(() => {
        setStep(0);
    }, [setStep]);

    useEffect(() => {
        setBoardPositions(stepData[stepIndex].boardPositions);
        setCapturedPieces(stepData[stepIndex].capturedPieces);
    }, [stepData, stepIndex, setBoardPositions, setCapturedPieces]);

    return (
        <>
            <ControlPanel moves={moves} />
            {stepIndex === moves.length && (
                <GameOverModal result={game.result} />
            )}

            <GameTable movesPanel={<MovesPanel moves={moves} />} />
        </>
    );
};

export default ClientPanel;
