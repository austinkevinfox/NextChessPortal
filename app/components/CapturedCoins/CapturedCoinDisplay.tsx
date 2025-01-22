import { Flex } from "@radix-ui/themes";
import CryptoIcon from "../CryptoIcon";

interface Props {
    coinSymbol: string;
    count: number;
}

const CapturedCoinDisplay = ({ coinSymbol, count }: Props) => {
    return (
        <Flex gap="1" py="1" align="center">
            <CryptoIcon symbol={coinSymbol} type="svg" />
            <div className="text-xs">({count})</div>
        </Flex>
    );
};

export default CapturedCoinDisplay;
