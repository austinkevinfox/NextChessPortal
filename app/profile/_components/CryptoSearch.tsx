"use client";
import { Token } from "@/app/Interfaces";
import { Flex, TextField } from "@radix-ui/themes";
import { default as cryptoManifest } from "cryptocurrency-icons/manifest.json";
import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
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
            const newCryptoList = Array.from(setObj).map((s) => {
                const tokenObj: Token = JSON.parse(s);
                // Init rate property here.  Rate will be fetched for selected tokens only.
                tokenObj.rate = 0;
                return tokenObj;
            });
            newCryptoList.sort(orderByName);
            setCryptoList(newCryptoList);
        } else {
            setCryptoList([]);
        }
    };

    return (
        <Flex
            direction="column"
            gap="1"
            className="w-52 h-5/6 mt-3 md:mt-0 md:ml-8"
        >
            <TextField.Root
                id="searchBox"
                placeholder="Search cryptocurrencies"
                onChange={handleChange}
            >
                <TextField.Slot>
                    <RxMagnifyingGlass />
                </TextField.Slot>
            </TextField.Root>

            <Flex direction="column" gap="1" className="overflow-auto">
                {cryptoList.map((coin) => (
                    <CryptoSearchResultItem key={coin.symbol} coin={coin} />
                ))}
            </Flex>
        </Flex>
    );
};

export default CryptoSearch;
