import { PieceCoinAssociation, Token } from "@/app/Interfaces";
import { create } from "zustand";

interface CryptoPieceStore {
    pieceCoinAssociation: PieceCoinAssociation;
    coinInDrag: undefined | Token;
    isApplyCoinBothSides: boolean;
    setIsApplyCoinBothSides: (option: boolean) => void;
    setCoinInDrag: (coin?: Token) => void;
    setCoinToPiece: (
        color: "white" | "black",
        pieceName: string,
        coin?: Token
    ) => void;
    setCoinToPieceBothSides: (pieceName: string, coin?: Token) => void;
    copyCoinAssociationToOtherSide: (colorToCopy: "white" | "black") => void;
    setCoinRates: (coins: { symbol: string; rate: number }[]) => void;
}

const useCryptoPieceStore = create<CryptoPieceStore>((set) => ({
    pieceCoinAssociation: { white: {}, black: {} },
    coinInDrag: undefined,
    isApplyCoinBothSides: true,
    setIsApplyCoinBothSides: (option) =>
        set(() => ({ isApplyCoinBothSides: option })),
    setCoinInDrag: (coin) => set(() => ({ coinInDrag: coin })),
    setCoinToPiece: (color, pieceName, coin) =>
        set((state) => {
            const tmpPieceCoinAssociation = { ...state.pieceCoinAssociation };
            tmpPieceCoinAssociation[color][pieceName] = coin;
            return { pieceCoinAssociation: tmpPieceCoinAssociation };
        }),
    setCoinToPieceBothSides: (pieceName, coin) =>
        set((state) => {
            const tmpPieceCoinAssociation = { ...state.pieceCoinAssociation };
            tmpPieceCoinAssociation.white[pieceName] = coin;
            tmpPieceCoinAssociation.black[pieceName] = coin;
            return { pieceCoinAssociation: tmpPieceCoinAssociation };
        }),
    copyCoinAssociationToOtherSide: (colorToCopy) =>
        set((state) => {
            const receivingColor = colorToCopy === "white" ? "black" : "white";
            return {
                pieceCoinAssociation: {
                    ...state.pieceCoinAssociation,
                    [receivingColor]: {
                        ...state.pieceCoinAssociation[colorToCopy],
                    },
                },
            };
        }),
    setCoinRates: (coins) =>
        set((state) => {
            const tmpPieceCoinAssociation = { ...state.pieceCoinAssociation };
            coins.forEach((coin) => {
                ["white", "black"].forEach((color) => {
                    Object.keys(tmpPieceCoinAssociation[color]).forEach(
                        (key) => {
                            if (
                                tmpPieceCoinAssociation[color][key]?.symbol ===
                                coin.symbol
                            ) {
                                tmpPieceCoinAssociation[color][key].rate =
                                    coin.rate;
                            }
                        }
                    );
                });
            });
            return { pieceCoinAssociation: tmpPieceCoinAssociation };
        }),
}));

export default useCryptoPieceStore;
