"use client";
import { Game } from "@prisma/client";
import { Flex, IconButton } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

interface Props {
    moves: string[];
    onForwardStep: () => void;
    onBackwardStep: () => void;
    stepIndex: number;
}

const ControlPanel = ({
    moves,
    onForwardStep,
    onBackwardStep,
    stepIndex,
}: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleStepForward = () => onForwardStep();

    const handleStepBackward = () => onBackwardStep();

    interface ButtonMap {
        [key: string]: { icon: ReactNode; callback: () => void };
    }

    const buttonMap: ButtonMap = {
        stepBack: { icon: <FaStepBackward />, callback: handleStepBackward },
        play: { icon: <FaPlay />, callback: handlePlayPause },
        pause: { icon: <FaPause />, callback: handlePlayPause },
        stepForward: { icon: <FaStepForward />, callback: handleStepForward },
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
