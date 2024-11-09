import { CapturedPieces } from "../Interfaces";

interface Props {
    playerColor: "white" | "black";
    capturedPieces?: CapturedPieces;
}

const Score = ({ playerColor, capturedPieces }: Props) => {
    const whiteScore = capturedPieces?.black
        ? capturedPieces.black.pawn.length +
          capturedPieces.black.knight.length * 3 +
          capturedPieces.black.bishop.length * 3 +
          capturedPieces.black.rook.length * 5 +
          capturedPieces.black.queen.length * 9
        : 0;

    const blackScore = capturedPieces?.white
        ? capturedPieces.white.pawn.length +
          capturedPieces.white.knight.length * 3 +
          capturedPieces.white.bishop.length * 3 +
          capturedPieces.white.rook.length * 5 +
          capturedPieces.white.queen.length * 9
        : 0;

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
