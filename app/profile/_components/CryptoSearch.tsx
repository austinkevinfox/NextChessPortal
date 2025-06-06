"use client";
import { Token, TokenRate } from "@/app/Interfaces";
import { fetchCoinMap } from "@/app/services/crypto";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { default as cryptoManifest } from "cryptocurrency-icons/manifest.json";
import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import CryptoRate from "./CryptoRate";
import CryptoSearchResultItem from "./CryptoSearchResultItem";

const CryptoSearch = () => {
    const [cryptoList, setCryptoList] = useState<Token[]>([]);

    const orderByName = (a: Token, b: Token) => {
        const nameA: string = a.name.toLowerCase();
        const nameB: string = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    };

    const handleChange = async () => {
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
            const newCryptoList = Array.from(setObj).map((s) => {
                const tokenObj: Token = JSON.parse(s);
                // Init rate property here.  Rate will be fetched for selected tokens only.
                tokenObj.rate = -1;
                return tokenObj;
            });

            newCryptoList.sort(orderByName);
            setCryptoList(newCryptoList);

            // Fetch prices
            const priceMap: TokenRate[] | undefined = await fetchCoinMap([
                ...new Set(newCryptoList.map((coin) => coin.symbol)),
            ]);

            if (priceMap && priceMap.length > 0) {
                // Convert priceMap array to a map keyed by symbol
                const priceMapBySymbol: { [symbol: string]: number } = {};
                priceMap.forEach((entry: TokenRate) => {
                    priceMapBySymbol[entry.code] = entry.rate;
                });
                // Update each token's rate property from priceMapBySymbol
                const updatedCryptoList = newCryptoList.map((token: Token) => ({
                    ...token,
                    rate: priceMapBySymbol[token.symbol] ?? 0,
                }));

                setCryptoList(updatedCryptoList);
            }
        } else {
            setCryptoList([]);
        }
    };

    return (
        <Flex
            direction="column"
            gap="1"
            className="w-full h-5/6 mt-3 md:mt-0 md:ml-8"
        >
            <Box className="w-52 md:w-64 mb-6">
                <TextField.Root
                    id="searchBox"
                    placeholder="Search cryptocurrencies"
                    onChange={handleChange}
                >
                    <TextField.Slot>
                        <RxMagnifyingGlass />
                    </TextField.Slot>
                </TextField.Root>
            </Box>

            <Flex direction="column" gap="1" className="w-fit overflow-auto">
                {cryptoList.map((coin) => (
                    <Flex
                        justify="between"
                        align="center"
                        gapX="3"
                        key={coin.symbol}
                    >
                        <CryptoSearchResultItem coin={coin} />
                        <CryptoRate rate={coin.rate} />
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default CryptoSearch;
