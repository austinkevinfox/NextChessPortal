import { PiecesByKind, Token } from "@/app/Interfaces";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import useStepStore from "@/app/state-management/store";
import { Flex } from "@radix-ui/themes";
import CapturedCoinDisplay, {
    Props as CapturedCoinDisplayProps,
} from "./CapturedCoinDisplay";

interface PieceCountMap {
    [pieceName: string]: number;
}

declare type PieceType = keyof PiecesByKind;

interface CoinMap {
    [pieceName: string]: Token | undefined;
}

interface Props {
    playerColor: "white" | "black";
    captureColor: "white" | "black";
}

const CapturedCoins = ({ playerColor, captureColor }: Props) => {
    const { pieceCoinAssociation } = useCryptoPieceStore();
    const { capturedPieces } = useStepStore();
    const internationNumberFormater = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    const lostPieceCounts: PieceCountMap = {};
    const gainedPieceCounts: PieceCountMap = {};
    const lostCoins: CoinMap = {};
    const gainedCoins: CoinMap = {};
    const capturedCoinDisplayProps: CapturedCoinDisplayProps[] = [];
    let isCapture = false;
    let total = 0;

    ["pawn", "knight", "bishop", "rook", "queen"].forEach((pieceName) => {
        lostPieceCounts[pieceName] =
            capturedPieces[playerColor][pieceName as PieceType].length;
        gainedPieceCounts[pieceName] =
            capturedPieces[captureColor][pieceName as PieceType].length;
        lostCoins[pieceName] =
            pieceCoinAssociation[playerColor][pieceName as PieceType];
        gainedCoins[pieceName] =
            pieceCoinAssociation[captureColor][pieceName as PieceType];

        /* Set isCapture once when first capture occurs.
         * Use isCapture flag to conditionally display total.
         */
        if (
            (!isCapture && gainedPieceCounts[pieceName] > 0) ||
            lostPieceCounts[pieceName] > 0
        ) {
            isCapture = true;
        }

        if (
            gainedPieceCounts[pieceName] > 0 &&
            lostPieceCounts[pieceName] === 0 &&
            gainedCoins[pieceName]?.symbol
        ) {
            total += gainedCoins[pieceName].rate * gainedPieceCounts[pieceName];

            capturedCoinDisplayProps.push({
                coinSymbol: gainedCoins[pieceName].symbol,
                count: gainedPieceCounts[pieceName],
                price: gainedCoins[pieceName].rate || 0,
            });
        }

        if (
            gainedPieceCounts[pieceName] === 0 &&
            lostPieceCounts[pieceName] > 0 &&
            lostCoins[pieceName]?.symbol
        ) {
            total -= lostCoins[pieceName].rate * lostPieceCounts[pieceName];

            capturedCoinDisplayProps.push({
                coinSymbol: lostCoins[pieceName].symbol,
                count: -lostPieceCounts[pieceName],
                price: lostCoins[pieceName].rate || 0,
            });
        }

        if (
            gainedPieceCounts[pieceName] > 0 &&
            lostPieceCounts[pieceName] > 0 &&
            gainedCoins[pieceName]?.symbol &&
            gainedCoins[pieceName].symbol === lostCoins[pieceName]?.symbol
        ) {
            capturedCoinDisplayProps.push({
                coinSymbol: gainedCoins[pieceName].symbol,
                count: gainedPieceCounts[pieceName],
                price: gainedCoins[pieceName].rate || 0,
            });
        }
    });

    return (
        <div className="pt-2">
            {capturedCoinDisplayProps.map((props, idx) => (
                <CapturedCoinDisplay
                    key={`capturedCoinDisplay-${idx}`}
                    {...props}
                />
            ))}
            {isCapture && (
                <Flex justify="end">
                    {internationNumberFormater.format(total)}
                </Flex>
            )}
        </div>
    );
};

export default CapturedCoins;
