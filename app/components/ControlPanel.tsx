"use client";
import { Flex, IconButton } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

const ControlPanel = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleStepForward = () => {
        console.log("step forward");
        setIsPlaying(false);
    };

    const handleStepBackward = () => {
        console.log("step backward");
        setIsPlaying(false);
    };

    interface ButtonMap {
        [key: string]: { icon: ReactNode; callback: () => void };
    }

    const buttonMap: ButtonMap = {
        stepBack: { icon: <FaStepBackward />, callback: handleStepBackward },
        play: { icon: <FaPlay />, callback: handlePlayPause },
        pause: { icon: <FaPause />, callback: handlePlayPause },
        stepForward: { icon: <FaStepForward />, callback: handleStepForward },
    };

    return (
        <Flex gap="3">
            {Object.keys(buttonMap).map((buttonKey) => {
                if (buttonKey === "play" && isPlaying) return null;
                if (buttonKey === "pause" && !isPlaying) return null;

                return (
                    <IconButton
                        color="gray"
                        variant="classic"
                        highContrast
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
