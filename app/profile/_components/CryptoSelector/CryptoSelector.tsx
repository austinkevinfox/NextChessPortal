"use client";
import { BTC, ETH, BNB, SOL, DOGE, XRP } from "@/app/public/crypto-icons";
import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import "./style.css";

const CryptoSelector = () => {
    const cryptoOptions = [
        { code: "BTC", src: BTC },
        { code: "ETH", src: ETH },
        { code: "XRP", src: XRP },
        { code: "BNB", src: BNB },
        { code: "SOL", src: SOL },
        { code: "DOGE", src: DOGE },
        { code: "None" },
    ];
    return (
        <Select.Root>
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
