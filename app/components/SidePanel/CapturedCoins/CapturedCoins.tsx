import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import useStepStore from "@/app/state-management/store";
import CapturedCoinDisplay from "./CapturedCoinDisplay";
import CoinAccountTotal from "./CoinAccountTotal";
import {
    getAccumulatedCoinValue,
    getCoinAccount,
} from "./capturedCoinServices";

interface Props {
    playerColor: "white" | "black";
    captureColor: "white" | "black";
}

const CapturedCoins = ({ playerColor, captureColor }: Props) => {
    const { pieceCoinAssociation } = useCryptoPieceStore();
    const { capturedPieces } = useStepStore();

    if (
        JSON.stringify(pieceCoinAssociation) ===
        JSON.stringify({ white: {}, black: {} })
    )
        return null;

    const coinAccount = getCoinAccount({
        pieceCoinAssociation,
        capturedPieces,
        playerColor,
        captureColor,
    });

    return (
        <div className="pt-2">
            {Object.keys(coinAccount).map((tokenSymbol) => (
                <CapturedCoinDisplay
                    key={tokenSymbol}
                    coinSymbol={tokenSymbol}
                    count={coinAccount[tokenSymbol].count}
                    price={coinAccount[tokenSymbol].token.rate}
                />
            ))}
            {Object.keys(coinAccount).length > 0 && (
                <CoinAccountTotal
                    total={getAccumulatedCoinValue(coinAccount)}
                />
            )}
        </div>
    );
};

export default CapturedCoins;
