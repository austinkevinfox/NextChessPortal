import { Token } from "@/app/Interfaces";
import { Flex, Box } from "@radix-ui/themes";

interface Props {
    coin: Token;
    
}

const CoinNameSymbol = ({coin}: Props) => {
  return (
      <Flex align="baseline" gap="1">
          <Box>{coin.name}</Box>
          <Box className="text-xs text-slate-500">{coin.symbol}</Box>
      </Flex>
  );
}

export default CoinNameSymbol