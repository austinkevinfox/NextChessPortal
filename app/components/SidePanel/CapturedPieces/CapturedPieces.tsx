import { PiecesByKind } from "@/app/Interfaces";
import CapturedPiecesDisplay from "./CapturedPiecesDisplay";

interface Props {
    capturedPiecesByKind: PiecesByKind;
    captureColor: "white" | "black";
}

const CapturedPieces = ({ capturedPiecesByKind, captureColor }: Props) => {
    return (
        <div>
            {capturedPiecesByKind.pawn && (
                <CapturedPiecesDisplay
                    captureColor={captureColor}
                    name="pawn"
                    pieces={capturedPiecesByKind.pawn}
                />
            )}

            {capturedPiecesByKind.knight && (
                <CapturedPiecesDisplay
                    captureColor={captureColor}
                    name="knight"
                    pieces={capturedPiecesByKind.knight}
                />
            )}

            {capturedPiecesByKind.bishop && (
                <CapturedPiecesDisplay
                    captureColor={captureColor}
                    name="bishop"
                    pieces={capturedPiecesByKind.bishop}
                />
            )}

            {capturedPiecesByKind.rook && (
                <CapturedPiecesDisplay
                    captureColor={captureColor}
                    name="rook"
                    pieces={capturedPiecesByKind.rook}
                />
            )}

            {capturedPiecesByKind.queen && (
                <CapturedPiecesDisplay
                    captureColor={captureColor}
                    name="queen"
                    pieces={capturedPiecesByKind.queen}
                />
            )}
        </div>
    );
};

export default CapturedPieces;
