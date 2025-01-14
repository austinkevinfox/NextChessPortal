import { BNB, BTC, DOGE, ETH, SOL, XRP } from "@/app/public/crypto-icons";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import { Box } from "@radix-ui/themes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface Props {
    pieceName: string;
    squareColor: "white" | "black";
}

const AssociatedCoin = ({ pieceName, squareColor }: Props) => {
    const { pieceCoinHash } = useCryptoPieceStore();
    const coinSymbol = pieceCoinHash[pieceName];

    type CryptoObject = {
        [key: string]: StaticImport;
    };

    const cryptoIcons: CryptoObject = {
        BTC: BTC,
        ETH: ETH,
        XRP: XRP,
        BNB: BNB,
        SOL: SOL,
        DOGE: DOGE,
    };

    return coinSymbol ? (
        <Box
            className={`absolute bottom-1/3 left-1 rounded-full w-8 h-8 ${
                squareColor === "black" ? "bg-white" : ""
            }`}
        >
            <Image
                src={cryptoIcons[coinSymbol]}
                alt={coinSymbol}
                className="h-full"
            />
        </Box>
    ) : null;
};

export default AssociatedCoin;
