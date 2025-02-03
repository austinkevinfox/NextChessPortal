"use client";
import useStepStore from "@/app/state-management/store";
import { useEffect, useState } from "react";
import CryptoSearch from "./_components/CryptoSearch";
import PieceCoinTable from "./_components/PieceCoinTable/PieceCoinTable";
import { Flex } from "@radix-ui/themes";
import ColorButton from "./_components/PieceCoinTable/ColorButton";

const ProfilePage = () => {
    const [selectedColor, setSelectedColor] = useState<"white" | "black">(
        "white"
    );
    const { setLoaded } = useStepStore();

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="h-full flex flex-col my-1 mx-3">
            <Flex
                gap="1"
                align="center"
                className="text-xs font-normal antialiased"
            >
                <ColorButton
                    color="white"
                    isSelected={selectedColor === "white"}
                    onClick={() => setSelectedColor("white")}
                />
                <ColorButton
                    color="black"
                    isSelected={selectedColor === "black"}
                    onClick={() => setSelectedColor("black")}
                />
                <Flex gap="1" align="center" className="ml-3">
                    <input
                        id="both"
                        type="checkbox"
                        value="true"
                        checked={true}
                        onChange={() => console.log("toggle")}
                    />
                    <label htmlFor="both">Apply to black and white</label>
                </Flex>
            </Flex>
            <div className="h-full flex flex-col my-1 md:flex-row">
                <PieceCoinTable selectedColor={selectedColor} />
                <CryptoSearch />
            </div>
        </div>
    );
};

export default ProfilePage;
