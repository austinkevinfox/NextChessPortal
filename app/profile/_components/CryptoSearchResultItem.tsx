import CryptoIcon from "@/app/components/CryptoIcon";
import { Flex, Box } from "@radix-ui/themes";
import { Token } from "@/app/Interfaces";

interface Props {
    coin: Token;
}

const CryptoSearchResultItem = ({ coin }: Props) => {
    return (
        <Flex
            key={coin.symbol}
            gap="1"
            align="center"
            className="hover:border border-1 border-solid rounded-lg cursor-pointer"
        >
            <CryptoIcon symbol={coin.symbol} type="32" />
            <Box>{`${coin.name} ${coin.symbol}`}</Box>
        </Flex>
    );
};

export default CryptoSearchResultItem;
