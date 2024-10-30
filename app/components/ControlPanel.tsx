"use client";
import { Flex, IconButton } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import useStepStore from "../state-management/step/store";

const ControlPanel = ({ moves }: { moves: string[] }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { stepIndex, incrementStep, decrementStep } = useStepStore();

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    interface ButtonMap {
        [key: string]: { icon: ReactNode; callback: () => void };
    }

    const buttonMap: ButtonMap = {
        stepBack: { icon: <FaStepBackward />, callback: decrementStep },
        play: { icon: <FaPlay />, callback: handlePlayPause },
        pause: { icon: <FaPause />, callback: handlePlayPause },
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
