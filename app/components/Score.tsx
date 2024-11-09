import { CapturedPieces } from "../Interfaces";

interface Props {
    playerColor: "white" | "black";
    capturedPieces?: CapturedPieces;
}

declare type CaptureColorType = keyof CapturedPieces;

const Score = ({ playerColor, capturedPieces }: Props) => {
    const getCumulativeScore = (captureColor: CaptureColorType) =>
        capturedPieces?.[captureColor]
            ? capturedPieces[captureColor].pawn.length +
              capturedPieces[captureColor].knight.length * 3 +
              capturedPieces[captureColor].bishop.length * 3 +
              capturedPieces[captureColor].rook.length * 5 +
              capturedPieces[captureColor].queen.length * 9
            : 0;
    const whiteScore = getCumulativeScore("black");
    const blackScore = getCumulativeScore("white");
    const whiteRelativeScore = whiteScore - blackScore || "=";
    const blackRelativeScore = blackScore - whiteScore || "=";

    return (
        <div>
            {playerColor === "white" && whiteRelativeScore}
            {playerColor === "black" && blackRelativeScore}
        </div>
    );
};

export default Score;
