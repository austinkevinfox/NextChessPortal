import { Box, Flex } from "@radix-ui/themes";
import useStepStore from "../state-management/store";
import CapturedPiecesDisplay from "./CapturedPiecesDisplay";
import Score from "./Score";
import Clock from "../live-game/_components/Clock";

interface Props {
    playerColor: "white" | "black";
}

const SidePanel = ({ playerColor }: Props) => {
    const { isLive, activePlayer, capturedPieces } = useStepStore();
    const captureColor = playerColor === "white" ? "black" : "white";

    return (
        <div className="hidden md:block w-52">
            <div
                className={`w-full p-2 text-xs ${
                    playerColor === activePlayer
                        ? "bg-amber-400"
                        : "bg-slate-200"
                }  ${
                    playerColor === "white" ? "rounded-tr-lg" : "rounded-tl-lg"
                }`}
            >
                <Flex justify="between">
                    <Box>{playerColor}</Box>
                    {isLive && (
                        <Clock isActive={playerColor === activePlayer} />
                    )}
                    <Score
                        playerColor={playerColor}
                        capturedPieces={capturedPieces}
                    />
                </Flex>
            </div>
            <div
                className={`min-h-[100px] p-4 bg-slate-300 ${
                    playerColor === "white" ? "rounded-br-lg" : "rounded-bl-lg"
                }`}
            >
                {capturedPieces?.[captureColor]?.pawn && (
                    <CapturedPiecesDisplay
                        captureColor={captureColor}
                        name="pawn"
                        pieces={capturedPieces[captureColor].pawn}
                    />
                )}

                {capturedPieces?.[captureColor]?.knight && (
                    <CapturedPiecesDisplay
                        captureColor={captureColor}
                        name="knight"
                        pieces={capturedPieces[captureColor].knight}
                    />
                )}

                {capturedPieces?.[captureColor]?.bishop && (
                    <CapturedPiecesDisplay
                        captureColor={captureColor}
                        name="bishop"
                        pieces={capturedPieces[captureColor].bishop}
                    />
                )}

                {capturedPieces?.[captureColor]?.rook && (
                    <CapturedPiecesDisplay
                        captureColor={captureColor}
                        name="rook"
                        pieces={capturedPieces[captureColor].rook}
                    />
                )}

                {capturedPieces?.[captureColor]?.queen && (
                    <CapturedPiecesDisplay
                        captureColor={captureColor}
                        name="queen"
                        pieces={capturedPieces[captureColor].queen}
                    />
                )}
            </div>
        </div>
    );
};

export default SidePanel;
