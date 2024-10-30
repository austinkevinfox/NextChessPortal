"use client";
import { Flex, IconButton } from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import useStepStore from "../state-management/step/store";

const ControlPanel = ({ moves }: { moves: string[] }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { stepIndex, incrementStep, decrementStep } = useStepStore();

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
    }, [isPlaying]);

    useEffect(() => {
        if (stepIndex >= moves.length) {
            setIsPlaying(false);
        }
    }, [stepIndex]);

    interface ButtonMap {
        [key: string]: { icon: ReactNode; callback: () => void };
    }

    const buttonMap: ButtonMap = {
        stepBack: { icon: <FaStepBackward />, callback: decrementStep },
        play: { icon: <FaPlay />, callback: () => setIsPlaying(true) },
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
        <Flex gap="3">
            {Object.keys(buttonMap).map((buttonKey) => {
                if (buttonKey === "play" && isPlaying) return null;
                if (buttonKey === "pause" && !isPlaying) return null;

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
