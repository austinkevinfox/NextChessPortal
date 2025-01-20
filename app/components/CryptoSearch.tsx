"use client";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { default as cryptoManifest } from "cryptocurrency-icons/manifest.json";
import { useState } from "react";
import CryptoIcon from "./CryptoIcon";

interface Token {
    symbol: string;
    name: string;
    color: string;
}

const CryptoSearch = () => {
    const [cryptoList, setCryptoList] = useState<Token[]>([]);

    const handleChange = () => {
        const searchBoxValue = (
            document.getElementById("searchBox") as HTMLInputElement
        ).value;

        if (searchBoxValue) {
            const pattern = new RegExp(`^${searchBoxValue}`, "i");
            const rawList = cryptoManifest.filter(
                (crypto) =>
                    pattern.test(crypto.symbol) || pattern.test(crypto.name)
            );
            const setObj = new Set(rawList.map((o) => JSON.stringify(o)));
            const newCryptoList = Array.from(setObj).map((s) => JSON.parse(s));
            setCryptoList(newCryptoList);
        } else {
            setCryptoList([]);
        }
    };

    return (
        <Flex
            direction="column"
            gap="1"
            className="h-full mt-3 md:mt-0 md:ml-8"
        >
            <TextField.Root
                id="searchBox"
                placeholder="Search cryptocurrencies"
                onChange={handleChange}
            ></TextField.Root>

            <Flex direction="column" gap="1" className="overflow-auto">
                {cryptoList.map((bit) => (
                    <Flex key={bit.symbol} gap="1" align="center">
                        <CryptoIcon symbol={bit.symbol} type="32" />
                        <Box>{`${bit.name} ${bit.symbol}`}</Box>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default CryptoSearch;
