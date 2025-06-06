"use client";
import CryptoIcon from "@/app/components/CryptoIcon";
import { Token } from "@/app/Interfaces";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import CoinNameSymbol from "../CoinNameSymbol";
import CryptoRate from "../CryptoRate";

interface Props {
    coin: Token;
    onDelete: () => void;
}

const CoinDisplay = ({ coin, onDelete }: Props) => {
    const [isHover, setIsHover] = useState(false);
    const { setCoinInDrag } = useCryptoPieceStore();
    const drag = () => {
        setCoinInDrag(coin);
    };

    return (
        <Flex
            gap="1"
            align="center"
            className="relative rounded-l-full rounded-r-lg cursor-pointer hover:bg-slate-100 w-full pr-16"
            draggable={true}
            onDragStart={drag}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <CryptoIcon symbol={coin.symbol} type="32" />
            <div className="flex flex-col flex-1">
                <CoinNameSymbol coin={coin} />
                <CryptoRate rate={coin.rate} />
            </div>
            <MdCancel
                className={`absolute top-0 right-0 ${
                    isHover ? "visible" : "invisible"
                }`}
                onClick={onDelete}
            />
        </Flex>
    );
};

export default CoinDisplay;
