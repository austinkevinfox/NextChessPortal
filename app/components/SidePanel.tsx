import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import useStepStore from "@/app/state-management/store";
import { Box, Flex } from "@radix-ui/themes";
import Clock from "../live-game/_components/Clock";
import CapturedCoins from "./CapturedCoins/CapturedCoins";
import CapturedPieces from "./CapturedPieces/CapturedPieces";
import Score from "./Score";

interface Props {
    playerColor: "white" | "black";
}

const SidePanel = ({ playerColor }: Props) => {
    const { isLive, activePlayer, capturedPieces } = useStepStore();
    const { pieceCoinAssociation } = useCryptoPieceStore();
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
                className={`min-h-[100px] p-4 bg-slate-300 divide-y-2 ${
                    playerColor === "white" ? "rounded-br-lg" : "rounded-bl-lg"
                }`}
            >
                {capturedPieces?.[captureColor] && (
                    <CapturedPieces
                        capturedPiecesByKind={capturedPieces[captureColor]}
                        captureColor={captureColor}
                    />
                )}

                {capturedPieces?.[captureColor] &&
                    pieceCoinAssociation?.[captureColor] &&
                    Object.values(pieceCoinAssociation[captureColor]).some(
                        (coin) => coin && coin.symbol.length > 0
                    ) && (
                        <CapturedCoins
                            captureColor={captureColor}
                            capturedPiecesByKind={capturedPieces[captureColor]}
                        />
                    )}
            </div>
        </div>
    );
};

export default SidePanel;
