import { PiecesByKind } from "@/app/Interfaces";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import CapturedCoinDisplay from "./CapturedCoinDisplay";

interface Props {
    captureColor: "white" | "black";
    capturedPiecesByKind: PiecesByKind;
}

const CapturedCoins = ({ captureColor, capturedPiecesByKind }: Props) => {
    const { pieceCoinAssociation } = useCryptoPieceStore();

    return (
        <div className="pt-2">
            {capturedPiecesByKind.pawn.length > 0 &&
                pieceCoinAssociation[captureColor].pawn && (
                    <CapturedCoinDisplay
                        coinSymbol={
                            pieceCoinAssociation[captureColor].pawn.symbol
                        }
                        count={capturedPiecesByKind.pawn.length}
                        price={pieceCoinAssociation[captureColor].pawn.rate}
                    />
                )}

            {capturedPiecesByKind.knight.length > 0 &&
                pieceCoinAssociation[captureColor].knight && (
                    <CapturedCoinDisplay
                        coinSymbol={
                            pieceCoinAssociation[captureColor].knight.symbol
                        }
                        count={capturedPiecesByKind.knight.length}
                        price={pieceCoinAssociation[captureColor].knight.rate}
                    />
                )}

            {capturedPiecesByKind.bishop.length > 0 &&
                pieceCoinAssociation[captureColor].bishop && (
                    <CapturedCoinDisplay
                        coinSymbol={
                            pieceCoinAssociation[captureColor].bishop.symbol
                        }
                        count={capturedPiecesByKind.bishop.length}
                        price={pieceCoinAssociation[captureColor].bishop.rate}
                    />
                )}

            {capturedPiecesByKind.rook.length > 0 &&
                pieceCoinAssociation[captureColor].rook && (
                    <CapturedCoinDisplay
                        coinSymbol={
                            pieceCoinAssociation[captureColor].rook.symbol
                        }
                        count={capturedPiecesByKind.rook.length}
                        price={pieceCoinAssociation[captureColor].rook.rate}
                    />
                )}

            {capturedPiecesByKind.queen.length > 0 &&
                pieceCoinAssociation[captureColor].queen && (
                    <CapturedCoinDisplay
                        coinSymbol={
                            pieceCoinAssociation[captureColor].queen.symbol
                        }
                        count={capturedPiecesByKind.queen.length}
                        price={pieceCoinAssociation[captureColor].queen.rate}
                    />
                )}
        </div>
    );
};

export default CapturedCoins;
