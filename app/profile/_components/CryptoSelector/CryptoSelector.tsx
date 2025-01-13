"use client";
import { BNB, BTC, DOGE, ETH, SOL, XRP } from "@/app/public/crypto-icons";
import * as Select from "@radix-ui/react-select";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import "./style.css";

interface Props {
    pieceName: string;
    selectedCoin: string | undefined;
    onCoinSelection: (pieceName: string, coin: string) => void;
}

const CryptoSelector = ({
    pieceName,
    selectedCoin,
    onCoinSelection,
}: Props) => {
    const cryptoOptions = [
        { code: "BTC", src: BTC },
        { code: "ETH", src: ETH },
        { code: "XRP", src: XRP },
        { code: "BNB", src: BNB },
        { code: "SOL", src: SOL },
        { code: "DOGE", src: DOGE },
        { code: "None" },
    ];

    const handleCoinSelection = (coin: string) => {
        onCoinSelection(pieceName, coin);
    };

    return (
        <Select.Root value={selectedCoin} onValueChange={handleCoinSelection}>
            <Select.Trigger className="SelectTrigger">
                <Select.Value placeholder="Select" />
                <Select.Icon>
                    <FaChevronDown />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className="SelectContent">
                    <Select.ScrollUpButton />
                    <Select.Viewport className="SelectViewport">
                        {cryptoOptions.map((crypto) => (
                            <Select.Item key={crypto.code} value={crypto.code}>
                                <Flex direction="column" align="center">
                                    <Select.ItemText className="SelectItem">
                                        {crypto.src ? (
                                            <Image
                                                src={crypto.src}
                                                alt={crypto.code}
                                                className={`w-6`}
                                            />
                                        ) : (
                                            <div className="text-xs">
                                                {crypto.code}
                                            </div>
                                        )}
                                    </Select.ItemText>
                                    {crypto.src && (
                                        <div className="text-xs">
                                            {crypto.code}
                                        </div>
                                    )}
                                </Flex>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                    <Select.Arrow />
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default CryptoSelector;
