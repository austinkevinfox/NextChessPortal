"use client";
import useStepStore from "@/app/state-management/store";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useCryptoPieceStore from "../state-management/cryptoPieceStore";
import CryptoSearch from "./_components/CryptoSearch";
import ColorButton from "./_components/PieceCoinTable/ColorButton";
import PieceCoinTable from "./_components/PieceCoinTable/PieceCoinTable";

const ProfilePage = () => {
    const [selectedColor, setSelectedColor] = useState<"white" | "black">(
        "white"
    );
    const { setLoaded } = useStepStore();
    const {
        isApplyCoinBothSides,
        isTouchMoveRuleActive,
        setIsApplyCoinBothSides,
        setIsTouchMoveRuleActive,
        copyCoinAssociationToOtherSide,
    } = useCryptoPieceStore();

    useEffect(() => {
        setLoaded(true);
    }, [setLoaded]);

    const toggleApplyToBoth = () => {
        const newToggleState = !isApplyCoinBothSides;
        if (newToggleState) {
            copyCoinAssociationToOtherSide(selectedColor);
        }
        setIsApplyCoinBothSides(newToggleState);
    };

    const toggleTouchMove = () => {
        setIsTouchMoveRuleActive(!isTouchMoveRuleActive);
    };

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
                        id="both-colors"
                        type="checkbox"
                        checked={isApplyCoinBothSides}
                        onChange={toggleApplyToBoth}
                    />
                    <label htmlFor="both">Apply to black and white</label>
                </Flex>
                <Flex gap="1" align="center" className="ml-3">
                    <input
                        id="touch-move-rule"
                        type="checkbox"
                        checked={isTouchMoveRuleActive}
                        onChange={toggleTouchMove}
                    />
                    <label htmlFor="both">Apply Touch-Move Rule</label>
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
