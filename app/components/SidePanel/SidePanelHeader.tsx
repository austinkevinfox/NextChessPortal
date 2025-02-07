import Clock from "@/app/live-game/_components/Clock";
import useStepStore from "@/app/state-management/store";
import { Flex, Box } from "@radix-ui/themes";
import Score from "./Score";

interface Props {
    playerColor: "white" | "black";
}

const SidePanelHeader = ({ playerColor }: Props) => {
    const { isLive, activePlayer, capturedPieces } = useStepStore();
    return (
        <div
            className={`w-full p-2 text-xs ${
                playerColor === activePlayer ? "bg-amber-400" : "bg-slate-200"
            }  ${playerColor === "white" ? "rounded-tr-lg" : "rounded-tl-lg"}`}
        >
            <Flex justify="between">
                <Box>{playerColor}</Box>
                {isLive && <Clock isActive={playerColor === activePlayer} />}
                <Score
                    playerColor={playerColor}
                    capturedPieces={capturedPieces}
                />
            </Flex>
        </div>
    );
};

export default SidePanelHeader;
