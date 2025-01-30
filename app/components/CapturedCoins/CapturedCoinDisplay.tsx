import { Flex } from "@radix-ui/themes";
import CryptoIcon from "../CryptoIcon";

interface Props {
    coinSymbol: string;
    count: number;
    price: number;
}

const CapturedCoinDisplay = ({ coinSymbol, count, price }: Props) => {
    const internationNumberFormater = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    return (
        <Flex justify="between" align="center">
            <Flex gap="1" py="1" align="center">
                <CryptoIcon symbol={coinSymbol} type="svg" />
                <div className="text-xs">({count})</div>
            </Flex>
            <div className="text-xs">
                {internationNumberFormater.format(price * count)}
            </div>
        </Flex>
    );
};

export default CapturedCoinDisplay;
