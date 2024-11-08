import { Flex, Box } from "@radix-ui/themes";
import { CapturedPieces } from "../Interfaces";
import CapturedPiecesDisplay from "./CapturedPiecesDisplay";
import Score from "./Score";

interface Props {
    playerColor: "white" | "black";
    capturedPieces?: CapturedPieces;
}

const SidePanel = ({ playerColor, capturedPieces }: Props) => {
    const captureColor = playerColor === "white" ? "black" : "white";

    return (
        <div className="hidden md:block w-52 h-1/2 p-4 bg-slate-300">
            <Flex justify="between">
                <Box>{playerColor}</Box>
                <Score
                    playerColor={playerColor}
                    capturedPieces={capturedPieces}
                />
            </Flex>

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
    );
};

export default SidePanel;
