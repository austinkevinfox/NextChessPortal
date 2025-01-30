"use client";
import { Flex, IconButton } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import useStepStore from "../state-management/store";

const ControlPanel = ({ moves }: { moves: string[] }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const { stepIndex, incrementStep, decrementStep, setStep } = useStepStore();

    useEffect(() => {
        let intervalId = setInterval(() => null, 10);

        if (isPlaying) {
            intervalId = setInterval(() => {
                incrementStep();
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isPlaying, incrementStep]);

    useEffect(() => {
        if (stepIndex >= moves.length) {
            setIsPlaying(false);
            setIsGameOver(true);
        } else {
            setIsGameOver(false);
        }
    }, [stepIndex, moves.length]);

    interface ButtonMap {
        [key: string]: { icon: ReactNode; callback: () => void };
    }

    const buttonMap: ButtonMap = {
        stepBack: { icon: <FaStepBackward />, callback: decrementStep },
        play: { icon: <FaPlay />, callback: () => setIsPlaying(true) },
        reset: { icon: <BiReset />, callback: () => setStep(0) },
        pause: { icon: <FaPause />, callback: () => setIsPlaying(false) },
        stepForward: { icon: <FaStepForward />, callback: incrementStep },
    };

    const isButtonDisabled = (buttonKey: string): boolean => {
        if (buttonKey === "stepBack" && stepIndex === 0) {
            return true;
        }
        if (buttonKey === "stepForward" && stepIndex === moves.length) {
            return true;
        }
        return false;
    };

    return (
        <Flex gap="3" my="1">
            {Object.keys(buttonMap).map((buttonKey) => {
                if (buttonKey === "play" && (isPlaying || isGameOver))
                    return null;
                if (buttonKey === "pause" && !isPlaying) return null;
                if (buttonKey === "reset" && !isGameOver) return null;

                return (
                    <IconButton
                        key={`control-panel-btn-${buttonKey}`}
                        color="gray"
                        variant="classic"
                        highContrast
                        disabled={isButtonDisabled(buttonKey)}
                        onClick={buttonMap[buttonKey].callback}
                    >
                        {buttonMap[buttonKey].icon}
                    </IconButton>
                );
            })}
        </Flex>
    );
};

export default ControlPanel;
