import { PiecesByKind } from "@/app/Interfaces";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import CapturedCoinDisplay from "./CapturedCoinDisplay";

interface Props {
    capturedPiecesByKind: PiecesByKind;
}

const CapturedCoins = ({ capturedPiecesByKind }: Props) => {
    const { pieceCoinHash } = useCryptoPieceStore();

    return (
        <div className="pt-2">
            {capturedPiecesByKind.pawn.length > 0 && pieceCoinHash.pawn && (
                <CapturedCoinDisplay
                    coinSymbol={pieceCoinHash.pawn.symbol}
                    count={capturedPiecesByKind.pawn.length}
                />
            )}

            {capturedPiecesByKind.knight.length > 0 && pieceCoinHash.knight && (
                <CapturedCoinDisplay
                    coinSymbol={pieceCoinHash.knight.symbol}
                    count={capturedPiecesByKind.knight.length}
                />
            )}

            {capturedPiecesByKind.bishop.length > 0 && pieceCoinHash.bishop && (
                <CapturedCoinDisplay
                    coinSymbol={pieceCoinHash.bishop.symbol}
                    count={capturedPiecesByKind.bishop.length}
                />
            )}

            {capturedPiecesByKind.rook.length > 0 && pieceCoinHash.rook && (
                <CapturedCoinDisplay
                    coinSymbol={pieceCoinHash.rook.symbol}
                    count={capturedPiecesByKind.rook.length}
                />
            )}

            {capturedPiecesByKind.queen.length > 0 && pieceCoinHash.queen && (
                <CapturedCoinDisplay
                    coinSymbol={pieceCoinHash.queen.symbol}
                    count={capturedPiecesByKind.queen.length}
                />
            )}
        </div>
    );
};

export default CapturedCoins;
