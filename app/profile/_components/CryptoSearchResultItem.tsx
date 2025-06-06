import CryptoIcon from "@/app/components/CryptoIcon";
import { Token } from "@/app/Interfaces";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import { Flex } from "@radix-ui/themes";
import CoinNameSymbol from "./CoinNameSymbol";

interface Props {
    coin: Token;
}

const CryptoSearchResultItem = ({ coin }: Props) => {
    const { setCoinInDrag } = useCryptoPieceStore();
    const drag = () => {
        setCoinInDrag(coin);
    };

    return (
        <Flex
            gap="1"
            align="center"
            className="border border-1 border-solid border-transparent rounded-l-full rounded-r-lg cursor-pointer pr-3 hover:border-slate-200"
            draggable={true}
            onDragStart={drag}
        >
            <CryptoIcon symbol={coin.symbol} type="32" />
            <CoinNameSymbol coin={coin} />
        </Flex>
    );
};

export default CryptoSearchResultItem;
