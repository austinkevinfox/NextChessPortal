import { CapturedPieces } from "../Interfaces";
import CapturedPiecesDisplay from "./CapturedPiecesDisplay";

interface Props {
    playerColor: "white" | "black";
    capturedPieces: CapturedPieces;
}

const SidePanel = ({ playerColor, capturedPieces }: Props) => {
    const captureColor = playerColor === "white" ? "black" : "white";

    return (
        <div className="hidden md:block w-52 h-1/2 p-4 bg-slate-300">
            <div>Player {playerColor}</div>

            <CapturedPiecesDisplay
                captureColor={captureColor}
                name="pawn"
                pieces={capturedPieces[captureColor].pawn}
            />

            <CapturedPiecesDisplay
                captureColor={captureColor}
                name="knight"
                pieces={capturedPieces[captureColor].knight}
            />

            <CapturedPiecesDisplay
                captureColor={captureColor}
                name="bishop"
                pieces={capturedPieces[captureColor].bishop}
            />

            <CapturedPiecesDisplay
                captureColor={captureColor}
                name="rook"
                pieces={capturedPieces[captureColor].rook}
            />

            <CapturedPiecesDisplay
                captureColor={captureColor}
                name="queen"
                pieces={capturedPieces[captureColor].queen}
            />
        </div>
    );
};

export default SidePanel;
