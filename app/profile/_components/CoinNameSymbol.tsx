import { Token } from "@/app/Interfaces";
import { Box, Flex } from "@radix-ui/themes";

const CoinNameSymbol = ({ coin }: { coin: Token }) => {
    return (
        <Flex align="baseline" gap="1">
            <Box className="whitespace-nowrap">{coin.name}</Box>
            <Box className="text-xs text-slate-500">{coin.symbol}</Box>
        </Flex>
    );
};

export default CoinNameSymbol;
