import { Flex } from "@radix-ui/themes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { BNB, BTC, DOGE, ETH, SOL, XRP } from "@/app/public/crypto-icons";

interface Props {
    coinSymbol: string;
    count: number;
}

const CapturedCoinDisplay = ({ coinSymbol, count }: Props) => {
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
    return (
        <Flex gap="1" py="1" align="center">
            <Image
                src={cryptoIcons[coinSymbol]}
                alt={coinSymbol}
                className="w-5 aspect-square"
            />
            <div className="text-xs">({count})</div>
        </Flex>
    );
};

export default CapturedCoinDisplay;
